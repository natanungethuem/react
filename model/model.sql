CREATE SEQUENCE base_sq_01                   INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1;
CREATE SEQUENCE financial_movement_sq_01     INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1;

CREATE DOMAIN dm_cost_type TEXT
    CONSTRAINT ck_cost_type_01 CHECK ( VALUE IN ( 
	'TA',
	'CR',
	'DE',
	'PG',
	'BP',
	'BT',
	'VE',
  'UC' ) );

COMMENT ON DOMAIN dm_cost_type IS '- st_type: Tipo do custo
   - TA: Imposto;
   - CR: Crédito;
   - DE: Débito;
   - PG: Gateway de pagamento;
   - BP: Boleto bancário;
   - BT: Transferência bancaria;
   - VE: Garantia veterinária
   - UC: Crédito do usuário'; 

CREATE DOMAIN dm_account_type TEXT
    CONSTRAINT ck_account_type_01 CHECK ( VALUE IN ( 
	'CA',
	'CS' ) );

COMMENT ON DOMAIN dm_account_type IS 'Tipo de conta do usuario:
 - CA: Conta corrente
 - CS: Conta poupança';



CREATE TABLE simple_base (
   ts_record      TIMESTAMP DEFAULT now(),
   ts_last_update TIMESTAMP DEFAULT now()
);

CREATE TABLE base ( 
  int_base_id               INTEGER NOT NULL DEFAULT NEXTVAL('base_sq_01'::regclass),
  st_status_ck              CHARACTER(2)   NOT NULL,
  st_properties_js          JSONB,

  CONSTRAINT pk_base       PRIMARY KEY ( int_base_id )
) INHERITS ( simple_base );


CREATE TABLE users
(
  int_user_id               INTEGER NOT NULL DEFAULT CURRVAL( 'base_sq_01'::regclass),
  st_status_ck              CHARACTER(2) NOT NULL DEFAULT 'CR'::CHARACTER(2),
  st_login                  CHARACTER VARYING(255) NOT NULL,
  st_password               TEXT NOT NULL,
  st_email                  CHARACTER VARYING(255) NOT NULL,
  
  CONSTRAINT pk_users       PRIMARY KEY (int_user_id ),

  CONSTRAINT uq_users_01 UNIQUE (st_login),

  CONSTRAINT ck_users_01    CHECK (st_status_ck::text = ANY (ARRAY[ 'BL'::character(2)
								                                  , 'CR'::character(2)]::text[]))
) INHERITS( base );


COMMENT ON COLUMN users.st_login IS 'Login do usuário. Deve ser o mesmo email do usuario';
COMMENT ON COLUMN users.st_password IS 'Password do usuario';
COMMENT ON COLUMN users.st_email IS 'Mesmo email do login, no entanto este atributo deve ser usado para contato com o usuario';
COMMENT ON COLUMN users.st_status_ck IS 'Status do usuário
	BL: BLOCKED - Usuário bloqueado por algum motivo.
	CR: CREATED - Usuário criado
	CM: COMMITMENT - Significa que ele aceitou o contrato de prestação de serviço da toca de aluguel.';
	

--------------------------------------------------------------------
-- Index
--------------------------------------------------------------------  
CREATE INDEX idx_users_01 ON users USING btree (st_status_ck);

--------------------------------------------------------------------
--Functions
--------------------------------------------------------------------
CREATE OR REPLACE FUNCTION tgb_users_01() 
RETURNS trigger AS 
$BODY$ 
BEGIN 
  NEW.st_login := LOWER( NEW.st_login );
  NEW.st_email := NEW.st_login;
  RETURN NEW; 
END; 
$BODY$ 
LANGUAGE plpgsql VOLATILE 
COST 100; 

--------------------------------------------------------------------
-- Triggers
--------------------------------------------------------------------
CREATE TRIGGER tgb_users_01 BEFORE INSERT ON users FOR EACH ROW EXECUTE PROCEDURE tgb_users_01();

CREATE TABLE bank (
	nr_bank_id   NUMERIC(3 ) NOT NULL,
	st_name      VARCHAR(128)  NOT NULL,
	st_status_ck CHARACTER(2) NOT NULL DEFAULT 'HI'::character(2),
	
	CONSTRAINT pk_bank PRIMARY KEY ( nr_bank_id ),

    CONSTRAINT ck_bank_01 CHECK (st_status_ck::text = ANY (ARRAY[ 'HI'::CHARACTER(2)
	                                                            , 'ST'::CHARACTER(2)
																, 'ND'::CHARACTER(2)]::TEXT[]))
);	

COMMENT ON TABLE bank IS 'Armazena os códigos e nomes dos banco usados pela toca de aluguel';
COMMENT ON COLUMN bank.nr_bank_id IS 'Código do banco';

--==========================================================
--Movement
--==========================================================
CREATE TABLE base_movement 
( st_status_ck              CHARACTER(2) NOT NULL
, st_type                   CHARACTER( 2 ) NOT NULL
, nr_value                  DECIMAL( 10,2 ) NOT NULL DEFAULT 0
, int_user_id               INTEGER NOT NULL
) INHERITS( base );

CREATE TABLE financial_movement 
( int_financial_movement_id INTEGER NOT NULL DEFAULT NEXTVAL( 'financial_movement_sq_01'::regclass)
, st_status_ck              CHARACTER(2) NOT NULL DEFAULT 'BB'::CHARACTER(2)
, st_source_type            dm_cost_type,
, int_transaction_id        INTEGER NULL
, st_to_account_type        CHARACTER( 2 ) NULL
, nr_to_bank_id             DECIMAL ( 3 ) NULL
, st_to_agency              VARCHAR ( 6 ) NULL
, st_to_account             VARCHAR ( 15 ) NULL
, int_parent_id             INTEGER NULL
, st_properties_js          JSONB
, CONSTRAINT pk_financial_movement       PRIMARY KEY ( int_financial_movement_id )
, CONSTRAINT ck_financial_movement_01    CHECK (st_status_ck::text = ANY (ARRAY[ 'CA'::character(2) --Cancelado
                                                                                , 'CL'::character(2) --Fechado
                                                                                , 'BB'::character(2) --Blocked before - Bloqueado antes da aprovação do gateway
                                                                                , 'BA'::character(2) --Blocked after - Bloqueado após aprovação do gateway
                                                                                , 'AF'::character(2) --Disponível para saque rápido
                                                                                , 'CT'::character(2) --Canceled by transaction - Cancelado pela transação
                                                                                , 'ER'::character(2) --Error
																			                                        ]::text[]))
																			   
, CONSTRAINT ck_financial_movement_02    CHECK (st_type::text = ANY (ARRAY[ 'TC'::character(2)
                                                                            , 'RD'::character(2)
                                                                            , 'RI'::character(2)
                                                                            , 'CW'::character(2)
                                                                            , 'BD'::character(2)]::text[]))
																		  
, CONSTRAINT ck_financial_movement_03    CHECK (st_to_account_type::text = ANY (ARRAY[ 'CA'::character(2)
								                                                      , 'CS'::character(2)]::text[]))
, CONSTRAINT fk_financial_movement_01 FOREIGN KEY (int_transaction_id) REFERENCES transactions(int_transaction_id)
, CONSTRAINT fk_financial_movement_02 FOREIGN KEY (int_parent_id) REFERENCES financial_movement(int_financial_movement_id)																		  
) INHERITS( base_movement );



CREATE INDEX idx_financial_movement_01 ON financial_movement USING btree (st_status_ck);
CREATE INDEX idx_financial_movement_02 ON financial_movement USING btree (int_user_id);
CREATE INDEX idx_financial_movement_04 ON financial_movement USING btree (int_parent_id);

COMMENT ON COLUMN financial_movement.int_user_id        IS 'Id do usuario que feza transação bancária';      
COMMENT ON COLUMN financial_movement.nr_value           IS 'Valor da transação';      
COMMENT ON COLUMN financial_movement.st_type            IS 'Tipo da transação:
 - TC: crédito na conta corrente do usuário
 - RD: taxa de serviço
 - CW: taxa de saque
 - RI: Juros da toca de aluguel
 - BD: Débito na conta corrente feito pelo usuário.';
COMMENT ON COLUMN financial_movement.nr_to_bank_id      IS 'Id do banco para onde o valor vai ser transferido';
COMMENT ON COLUMN financial_movement.st_to_agency       IS 'Agencia para qual o valor vai ser transferido';
COMMENT ON COLUMN financial_movement.st_to_account      IS 'Conta para qual o valor vai ser transerido';
COMMENT ON COLUMN financial_movement.nr_from_bank_id    IS 'Id do banco donde o valor vai ser debitado';
COMMENT ON COLUMN financial_movement.st_from_agency     IS 'Agencia donde o valor vai ser debitado';
COMMENT ON COLUMN financial_movement.st_from_account    IS 'Conta donde o valor vai ser debitado';

COMMENT ON COLUMN financial_movement.st_status_ck IS ' - CA: Cancelado
 - CL: Fechado
 - BB: Blocked before - Bloqueado antes da aprovação do gateway
 - BA: Blocked after - Bloqueado após aprovação do gateway
 - AF: Disponível para saque rápido
 - CT: Canceled by transaction - Cancelado pela transação
 - ER: Error';

 
CREATE OR REPLACE FUNCTION tga_financial_movement_01() 
RETURNS trigger AS 
$BODY$ 
BEGIN 
  INSERT INTO financial_movement
  (  int_user_id
  ,  nr_value
  ,  int_parent_id 
  ,  st_type )
  VALUES 
  (  NEW.int_user_id
  ,  ( SELECT ( st_value::text )::integer
		  FROM   property
		  WHERE  st_property_id = 'cash_tax' )
  ,  NEW.int_financial_movement_id
  ,  'CW' );	
  
  RETURN NULL; 
END; 
$BODY$ 
LANGUAGE plpgsql VOLATILE 
COST 100;

CREATE OR REPLACE FUNCTION tga_financial_movement_02() 
RETURNS trigger AS 
$BODY$ 
BEGIN 
  UPDATE financial_movement 
  SET    st_status_ck = 'CL'
  WHERE  int_parent_id = NEW.int_financial_movement_id
  AND    st_type = 'RD';	
  
  RETURN NULL; 
END; 
$BODY$ 
LANGUAGE plpgsql VOLATILE 
COST 100;


CREATE OR REPLACE FUNCTION tga_financial_movement_03() 
RETURNS trigger AS 
$BODY$ 
BEGIN 
  UPDATE financial_movement 
  SET    st_status_ck = NEW.st_status_ck
  WHERE  int_parent_id = NEW.int_financial_movement_id
  AND    st_type = 'RI';	
  
  RETURN NULL; 
END; 
$BODY$ 
LANGUAGE plpgsql VOLATILE 
COST 100;

CREATE OR REPLACE FUNCTION tga_financial_movement_04() 
RETURNS trigger AS 
$BODY$ 
BEGIN 
	IF tg_op_to_enum( TG_OP ) = 'I' OR tg_op_to_enum( TG_OP ) = 'U' AND NOT( NEW.st_status_ck = OLD.st_status_ck ) THEN
		EXECUTE add_event( NEW.int_financial_movement_id, TG_TABLE_NAME, NEW.st_status_ck );
	END IF;
	RETURN NULL; 
END; 
$BODY$ 
LANGUAGE plpgsql VOLATILE 
COST 100; 


CREATE TRIGGER tga_financial_movement_01 AFTER INSERT OR UPDATE OF st_status_ck ON financial_movement FOR EACH ROW EXECUTE PROCEDURE tga_financial_movement_04();
CREATE TRIGGER tga_financial_movement_02 AFTER INSERT ON financial_movement FOR EACH ROW WHEN ( NEW.st_type = 'BD' ) EXECUTE PROCEDURE tga_financial_movement_01();
CREATE TRIGGER tga_financial_movement_03 AFTER UPDATE OF st_status_ck ON financial_movement FOR EACH ROW WHEN ( NEW.st_status_ck = 'CL' AND NEW.st_type = 'BD' ) EXECUTE PROCEDURE tga_financial_movement_02();
CREATE TRIGGER tga_financial_movement_04 AFTER UPDATE OF st_status_ck ON financial_movement FOR EACH ROW WHEN ( NEW.st_type = 'TC' ) EXECUTE PROCEDURE tga_financial_movement_03();