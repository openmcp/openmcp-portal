

--==================================================================================
-- tb_account_role
--==================================================================================
CREATE TABLE IF NOT EXISTS public.tb_account_role
(
    role_id character varying(50) COLLATE pg_catalog."default" NOT NULL,
    role_name character varying(100) COLLATE pg_catalog."default",
    description character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT tb_account_roles_pkey PRIMARY KEY (role_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


ALTER TABLE public.tb_account_role
    OWNER to postgres;

--==================================================================================
--tb_accounts
--==================================================================================
CREATE TABLE IF NOT EXISTS public.tb_accounts
(
    user_id character varying(20) COLLATE pg_catalog."default" NOT NULL,
    user_password character varying COLLATE pg_catalog."default",
    role_id character varying(50)[] COLLATE pg_catalog."default",
    created_time timestamp(6) without time zone,
    last_login_time timestamp(6) without time zone,
    projects character varying[] COLLATE pg_catalog."default",
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    CONSTRAINT tb_accounts_pkey PRIMARY KEY (user_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_accounts
    OWNER to scshin;

--==================================================================================
--tb_codes
--==================================================================================
CREATE TABLE IF NOT EXISTS public.tb_codes
(
    kinds character varying(20) COLLATE pg_catalog."default",
    code character varying(20) COLLATE pg_catalog."default" NOT NULL,
    description character varying(100) COLLATE pg_catalog."default",
    etc character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT tb_codes_pkey PRIMARY KEY (code)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


ALTER TABLE public.tb_codes
    OWNER to postgres;



--==================================================================================
--tb_config_aks
--==================================================================================
CREATE SEQUENCE public.tb_config_aks_seq_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.tb_config_aks_seq_seq
    OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.tb_config_aks
(
    seq integer NOT NULL DEFAULT nextval('tb_config_aks_seq_seq'::regclass),
    cluster character varying(200) COLLATE pg_catalog."default" NOT NULL,
    "clientId" character varying(200) COLLATE pg_catalog."default" NOT NULL,
    "clientSec" character varying(200) COLLATE pg_catalog."default" NOT NULL,
    "tenantId" character varying(200) COLLATE pg_catalog."default" NOT NULL,
    "subId" character varying(200) COLLATE pg_catalog."default" NOT NULL
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


ALTER TABLE public.tb_config_aks
    OWNER to postgres;


--==================================================================================
--tb_config_eks
--==================================================================================
CREATE SEQUENCE public.tb_config_eks_seq_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.tb_config_eks_seq_seq
    OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.tb_config_eks
(
    seq integer NOT NULL DEFAULT nextval('tb_config_eks_seq_seq'::regclass),
    cluster character varying(500) COLLATE pg_catalog."default" NOT NULL,
    "accessKey" character varying(500) COLLATE pg_catalog."default" NOT NULL,
    "secretKey" character varying(500) COLLATE pg_catalog."default" NOT NULL,
    region character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT tb_config_eks_pkey PRIMARY KEY (seq)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


ALTER TABLE public.tb_config_eks
    OWNER to postgres;


--==================================================================================
--tb_config_gke
--==================================================================================
CREATE SEQUENCE public.tb_config_gke_seq_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.tb_config_gke_seq_seq
    OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.tb_config_gke
(
    seq integer NOT NULL DEFAULT nextval('tb_config_gke_seq_seq'::regclass),
    cluster character varying(200) COLLATE pg_catalog."default" NOT NULL,
    type character varying(200) COLLATE pg_catalog."default" NOT NULL,
    "clientEmail" character varying(200) COLLATE pg_catalog."default" NOT NULL,
    "projectID" character varying(200) COLLATE pg_catalog."default" NOT NULL,
    "privateKey" character varying(3000) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tb_config_gke_pkey PRIMARY KEY (seq)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


ALTER TABLE public.tb_config_gke
    OWNER to postgres;


--==================================================================================
--tb_config_kvm
--==================================================================================
CREATE SEQUENCE public.tb_config_kvm_seq_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.tb_config_kvm_seq_seq
    OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.tb_config_kvm
(
    seq integer NOT NULL DEFAULT nextval('tb_config_kvm_seq_seq'::regclass),
    cluster character varying COLLATE pg_catalog."default" NOT NULL,
    "agentURL" character varying COLLATE pg_catalog."default" NOT NULL,
    "mClusterName" character varying COLLATE pg_catalog."default" NOT NULL,
    "mClusterPwd" character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tb_config_kvm_pkey PRIMARY KEY (seq)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


ALTER TABLE public.tb_config_kvm
    OWNER to postgres;

--==================================================================================
--tb_group_role
--==================================================================================
CREATE SEQUENCE public.tb_group_auth_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.tb_group_auth_seq
    OWNER TO postgres;
    
CREATE TABLE IF NOT EXISTS public.tb_group_role
(
    group_id integer NOT NULL DEFAULT nextval('tb_group_auth_seq'::regclass),
    group_name character varying COLLATE pg_catalog."default" NOT NULL,
    role_id character varying[] COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    member character varying[] COLLATE pg_catalog."default",
    projects character varying[] COLLATE pg_catalog."default",
    CONSTRAINT tb_group_role_pkey PRIMARY KEY (group_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


ALTER TABLE public.tb_group_role
    OWNER to postgres;

    
--==================================================================================
--tb_group_member
--==================================================================================
CREATE TABLE IF NOT EXISTS public.tb_group_member
(
    group_id integer NOT NULL,
    user_id character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tb_group_member_pkey PRIMARY KEY (group_id, user_id),
    CONSTRAINT fk_group_id FOREIGN KEY (group_id)
        REFERENCES public.tb_group_role (group_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id)
        REFERENCES public.tb_accounts (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


ALTER TABLE public.tb_group_member
    OWNER to postgres;

--==================================================================================
--tb_host_threshold
--==================================================================================
CREATE TABLE IF NOT EXISTS public.tb_host_threshold
(
    node_name character varying COLLATE pg_catalog."default" NOT NULL,
    cluster_name character varying COLLATE pg_catalog."default" NOT NULL,
    cpu_warn double precision,
    cpu_danger double precision,
    ram_warn double precision,
    ram_danger double precision,
    storage_warn double precision,
    storage_danger double precision,
    created_time timestamp with time zone,
    updated_time timestamp with time zone,
    CONSTRAINT tb_host_threshold_pkey PRIMARY KEY (node_name, cluster_name)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


ALTER TABLE public.tb_host_threshold
    OWNER to postgres;



--==================================================================================
--tb_portal_logs
--==================================================================================
CREATE TABLE IF NOT EXISTS public.tb_portal_logs
(
    user_id character varying(20) COLLATE pg_catalog."default" NOT NULL,
    code character varying(20) COLLATE pg_catalog."default" NOT NULL,
    created_time timestamp(6) without time zone NOT NULL,
    CONSTRAINT tb_portal_logs_pkey PRIMARY KEY (user_id, code, created_time)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


ALTER TABLE public.tb_portal_logs
    OWNER to postgres;

--==================================================================================
--tb_replica_status
--==================================================================================
CREATE TABLE IF NOT EXISTS public.tb_replica_status
(
    cluster character varying COLLATE pg_catalog."default" NOT NULL,
    pod character varying COLLATE pg_catalog."default" NOT NULL,
    status character varying(20) COLLATE pg_catalog."default",
    created_time timestamp(6) without time zone,
    CONSTRAINT tb_replica_status_pkey PRIMARY KEY (cluster, pod)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


ALTER TABLE public.tb_replica_status
    OWNER to postgres;

--==================================================================================
--tb_threshold_log
--==================================================================================
CREATE TABLE IF NOT EXISTS public.tb_threshold_log
(
    cluster_name character varying COLLATE pg_catalog."default" NOT NULL,
    node_name character varying COLLATE pg_catalog."default" NOT NULL,
    created_time timestamp with time zone NOT NULL,
    status character varying COLLATE pg_catalog."default",
    message character varying COLLATE pg_catalog."default",
    resource character varying COLLATE pg_catalog."default",
    CONSTRAINT tb_threshold_log_pkey PRIMARY KEY (cluster_name, node_name, created_time)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


ALTER TABLE public.tb_threshold_log
    OWNER to postgres;


--==================================================================================
--tb_dashboard
--==================================================================================
CREATE TABLE IF NOT EXISTS public.tb_dashboard
(
    user_id character varying COLLATE pg_catalog."default" NOT NULL,
    component character varying[] COLLATE pg_catalog."default",
    CONSTRAINT tb_dashboard_pkey PRIMARY KEY (user_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_dashboard
    OWNER to postgres;



CREATE EXTENSION "uuid-ossp"; -- uuid_generate_v4()를 사용하기 위함

--==================================================================================
--oauth_tokens
--==================================================================================
CREATE TABLE IF NOT EXISTS public.oauth_tokens
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    access_token text COLLATE pg_catalog."default" NOT NULL,
    access_token_expires_on timestamp without time zone NOT NULL,
    client_id text COLLATE pg_catalog."default" NOT NULL,
    refresh_token text COLLATE pg_catalog."default" NOT NULL,
    refresh_token_expires_on timestamp without time zone NOT NULL,
    user_id character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT oauth_tokens_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.oauth_tokens
    OWNER to postgres;


--==================================================================================
--oauth_clients
--==================================================================================
CREATE TABLE IF NOT EXISTS public.oauth_clients
(
    client_id text COLLATE pg_catalog."default" NOT NULL,
    client_secret text COLLATE pg_catalog."default" NOT NULL,
    redirect_uri text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT oauth_clients_pkey PRIMARY KEY (client_id, client_secret)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.oauth_clients
    OWNER to postgres;







--==================================================================================
--tb_policy
--==================================================================================
-- CREATE TABLE IF NOT EXISTS public.tb_policy
-- (
--     policy_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
--     policy_name character varying COLLATE pg_catalog."default",
--     rate character varying(10) COLLATE pg_catalog."default",
--     period character varying(10) COLLATE pg_catalog."default",
--     CONSTRAINT tb_policy_pkey PRIMARY KEY (policy_id)
-- )
-- WITH (
--     OIDS = FALSE
-- )
-- TABLESPACE pg_default;


-- ALTER TABLE public.tb_policy
--     OWNER to postgres;


--==================================================================================
--tb_policy_projects
--==================================================================================
-- CREATE TABLE IF NOT EXISTS public.tb_policy_projects
-- (
--     project character varying(100) COLLATE pg_catalog."default" NOT NULL,
--     cluster character varying(100) COLLATE pg_catalog."default" NOT NULL,
--     cls_cpu_trh_r numeric(100,0),
--     cls_mem_trh_r numeric(100,0),
--     pod_cpu_trh_r numeric(100,0),
--     pod_mem_trh_r numeric(100,0),
--     updated_time timestamp(6) with time zone,
--     CONSTRAINT tb_policy_projects_pkey PRIMARY KEY (project, cluster)
-- )
-- WITH (
--     OIDS = FALSE
-- )
-- TABLESPACE pg_default;


-- ALTER TABLE public.tb_policy_projects
--     OWNER to postgres;

--==============================================================================
--==============================================================================
-- METERING TABLES
--==============================================================================
--==============================================================================