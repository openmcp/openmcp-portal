-- Login/Logout
insert into tb_codes values ('LOG-PT','log-LG-VW01','Enter login page','Login');
insert into tb_codes values ('LOG-PT','log-LG-LG01','Log in','Login');
insert into tb_codes values ('LOG-PT','log-LG-LG02','Log out','Logout');


-- Dashboard Pages
insert into tb_codes values ('LOG-PT','log-DS-VW01','View Dashboard page','Dashboard');


-- Cluster Pages
insert into tb_codes values ('LOG-PT','log-CL-VW01','View cluster list page','Clusters');
insert into tb_codes values ('LOG-PT','log-CL-VW02','View cluster overview page','Clusters > Overview');
insert into tb_codes values ('LOG-PT','log-CL-VW03','View cluster nodes list page','Clusters > Nodes');
insert into tb_codes values ('LOG-PT','log-CL-VW04','View cluster nodes detail page','Clusters > Nodes > Node Information');
insert into tb_codes values ('LOG-PT','log-CL-VW05','View cluster pods list page','Clusters > Pods');
insert into tb_codes values ('LOG-PT','log-CL-VW06','View cluster pods detail page','Clusters > Pods > Pod Information');
insert into tb_codes values ('LOG-PT','log-CL-SR01','Search cluster list page','Clusters');
insert into tb_codes values ('LOG-PT','log-CL-SR02','Search clusters events','Clusters - Events');
insert into tb_codes values ('LOG-PT','log-CL-SR03','Search cluster nodes','Clusters > Nodes');
insert into tb_codes values ('LOG-PT','log-CL-SR04','Search cluster nodes events','Clusters > Nodes > Node Information - Events');
insert into tb_codes values ('LOG-PT','log-CL-SR05','Search cluster pods','Clusters > Pods');
insert into tb_codes values ('LOG-PT','log-CL-SR06','Search cluster pod status','Clusters > Pods - Pod Status');
insert into tb_codes values ('LOG-PT','log-CL-SR07','Search cluster containers','Clusters > Pods - Containers');
insert into tb_codes values ('LOG-PT','log-CL-SR08','Search cluster pods events','Clusters > Pods > Pod Information - Events');
insert into tb_codes values ('LOG-PT','log-CL-MD01','Modify cluster pod resources(cpu,memory)','Clusters > Pods > Pod Information - Resource Config');

-- Nodes Pages
insert into tb_codes values ('LOG-PT','log-ND-VW01','View node list page','Nodes');
insert into tb_codes values ('LOG-PT','log-ND-VW02','View node detail page','Nodes > Node Information');
insert into tb_codes values ('LOG-PT','log-ND-SR01','Search nodes','Nodes');
insert into tb_codes values ('LOG-PT','log-ND-SR02','Search nodes events','Nodes > Node Information - Events');
insert into tb_codes values ('LOG-PT','log-ND-MD01','Modify node taint','Nodes > Node Information - BasicInfo(Taint)');
insert into tb_codes values ('LOG-PT','log-ND-MD02','Modify public cloud node resource','Nodes > Node Information - BasicInfo(Config Resource)');
-- 2021-03-29
insert into tb_codes values ('LOG-PT','log-ND-CR01','Add EKS Node','Nodes > Add EKS Node');
insert into tb_codes values ('LOG-PT','log-ND-CR02','Add GKE Node','Nodes > Add GKE Node');
insert into tb_codes values ('LOG-PT','log-ND-CR03','Add AKS Node','Nodes > Add AKS Node');
insert into tb_codes values ('LOG-PT','log-ND-CR04','Add KVM Node','Nodes > Add KVM Node');


-- Projects Pages
insert into tb_codes values ('LOG-PT','log-PJ-VW01','View project list page','Projects');
insert into tb_codes values ('LOG-PT','log-PJ-VW02','View project overview page','Projects > Overview');
insert into tb_codes values ('LOG-PT','log-PJ-VW03','View project deployment list page','Projects > Resources > Workloads > Deplotments');
insert into tb_codes values ('LOG-PT','log-PJ-VW04','View project deployment detail page','Projects > Resources > Workloads > Deplotments > Deployment Information');
insert into tb_codes values ('LOG-PT','log-PJ-VW05','View project statefulsets list page','Projects > Resources > Workloads > Statefulsets');
insert into tb_codes values ('LOG-PT','log-PJ-VW06','View project statefulsets detail page','Projects > Resources > Workloads > Statefulsets > Statefulset Information');
insert into tb_codes values ('LOG-PT','log-PJ-VW07','View project pods list page','Projects > Resources > Pods');
insert into tb_codes values ('LOG-PT','log-PJ-VW08','View project pods detail page','Projects > Resources > Pods > Pod Information');
insert into tb_codes values ('LOG-PT','log-PJ-VW09','View project services list page','Projects > Resources > Services');
insert into tb_codes values ('LOG-PT','log-PJ-VW10','View project services detail page','Projects > Resources > Services > Service Information');
insert into tb_codes values ('LOG-PT','log-PJ-VW11','View project ingress list page','Projects > Resources > Ingress');
insert into tb_codes values ('LOG-PT','log-PJ-VW12','View project ingress detail page','Projects > Resources > Ingress > Ingress Information');
insert into tb_codes values ('LOG-PT','log-PJ-VW13','View project volumes page','Projects > Volumes');
insert into tb_codes values ('LOG-PT','log-PJ-VW14','View project volumes detail page','Projects > Volumes > Volume Information');
insert into tb_codes values ('LOG-PT','log-PJ-VW15','View project secrets page','Projects > Config > Secrets');
insert into tb_codes values ('LOG-PT','log-PJ-VW16','View project secrets detail page','Projects > Config > Secrets > Secrets Information');
insert into tb_codes values ('LOG-PT','log-PJ-VW17','View project config maps page','Projects > Config > ConfigMaps');
insert into tb_codes values ('LOG-PT','log-PJ-VW18','View project config maps detail page','Projects > Config > ConfigMaps > ConfigMaps Information');


insert into tb_codes values ('LOG-PT','log-PJ-SR01','Search project list page','Projects');
insert into tb_codes values ('LOG-PT','log-PJ-SR02','Search deployments','Projects > Resources > Workloads > Deplotments');
insert into tb_codes values ('LOG-PT','log-PJ-SR03','Search deployments pods','Projects > Resources > Workloads > Deplotment Information - Pods');
insert into tb_codes values ('LOG-PT','log-PJ-SR04','Search deployments ports','Projects > Resources > Workloads > Deplotment Information - Ports');
insert into tb_codes values ('LOG-PT','log-PJ-SR05','Search deployments events','Projects > Resources > Workloads > Deplotment Information - Events');
insert into tb_codes values ('LOG-PT','log-PJ-SR06','Search statefulsets','Projects > Resources > Workloads > Statefulsets');
insert into tb_codes values ('LOG-PT','log-PJ-SR07','Search statefulsets events','Projects > Resources > Workloads > Statefulsets - Events');
insert into tb_codes values ('LOG-PT','log-PJ-SR08','Search project pods','Projects > Resources > Pods');
insert into tb_codes values ('LOG-PT','log-PJ-SR09','Search project pod status','Projects > Resources > Pods > Pods Information - Pod Status');
insert into tb_codes values ('LOG-PT','log-PJ-SR10','Search project pod containters','Projects > Resources > Pods > Pods Information - Containters');
insert into tb_codes values ('LOG-PT','log-PJ-SR11','Search project pod events','Projects > Resources > Pods > Pods Information - Events');
insert into tb_codes values ('LOG-PT','log-PJ-SR12','Search project services','Projects > Resources > Services');
insert into tb_codes values ('LOG-PT','log-PJ-SR13','Search project service workloads','Projects > Resources > Services > Pods Information - Pod Status');
insert into tb_codes values ('LOG-PT','log-PJ-SR14','Search project service pods','Projects > Resources > Services > Pods Information - Containters');
insert into tb_codes values ('LOG-PT','log-PJ-SR15','Search project services events','Projects > Resources > Services > Pods Information - Events');
insert into tb_codes values ('LOG-PT','log-PJ-SR16','Search project ingress','Projects > Resources > Ingress');
insert into tb_codes values ('LOG-PT','log-PJ-SR17','Search project ingress workloads','Projects > Resources > Ingress > Ingress Information - Rules');
insert into tb_codes values ('LOG-PT','log-PJ-SR18','Search project ingress events','Projects > Resources > Ingress > Ingress Information - Events');
insert into tb_codes values ('LOG-PT','log-PJ-SR19','Search project volumes','Projects > Volumes');
insert into tb_codes values ('LOG-PT','log-PJ-SR20','Search project volumes workloads','Projects > Volumes > Volume Information - Rules');
insert into tb_codes values ('LOG-PT','log-PJ-SR21','Search project volumes events','Projects > Volumes > Volume Information - Events');
insert into tb_codes values ('LOG-PT','log-PJ-SR22','Search project secrets','Projects > Config > Secrets');
insert into tb_codes values ('LOG-PT','log-PJ-SR23','Search project secrets mounted-by','Projects > Config > Secrets > Secrets Information - Mounted By');
insert into tb_codes values ('LOG-PT','log-PJ-SR24','Search project secrets events','Projects > Config > Secrets > Secrets Information - Events');
insert into tb_codes values ('LOG-PT','log-PJ-SR25','Search project configmaps','Projects > Config > ConfigMaps');
insert into tb_codes values ('LOG-PT','log-PJ-SR26','Search project configmaps data','Projects > Config > ConfigMaps > ConfigMap Information - Data');
insert into tb_codes values ('LOG-PT','log-PJ-CR01','Create project','Projects > Create Project');
insert into tb_codes values ('LOG-PT','log-PJ-MD01','Migration deployment','Projects > Resources > Workloads > Deployments > Migration');

-- Pods Pages
insert into tb_codes values ('LOG-PT','log-PD-VW01','View pod list page','Pods');
insert into tb_codes values ('LOG-PT','log-PD-VW02','View pod overview page','Pods > Pod Information');
insert into tb_codes values ('LOG-PT','log-PD-SR01','Search pods','Pods');
insert into tb_codes values ('LOG-PT','log-PD-SR02','Search pod status','Pods > Pod Information - Pod Status');
insert into tb_codes values ('LOG-PT','log-PD-SR03','Search pod containers ','Pods > Pod Information - Containers');
insert into tb_codes values ('LOG-PT','log-PD-SR04','Search pod events','Pods > Pod Information - Events');
insert into tb_codes values ('LOG-PT','log-PD-MD01','Modify pod resources(cpu,memory)','Pod Information - Basic Info(Resource Config)');

-- Accounts
insert into tb_codes values ('LOG-PT','log-AC-VW01','View account list page','Settings > Accounts');
insert into tb_codes values ('LOG-PT','log-AC-SR01','Search accounts','Settings > Accounts');
insert into tb_codes values ('LOG-PT','log-AC-MD01','Modify account group','Settings > Accounts - edit');
insert into tb_codes values ('LOG-PT','log-AC-CR01','Create accounts','Settings > Accounts - Create Account');

-- policy
insert into tb_codes values ('LOG-PT','log-PO-MD01','Modify OMCP Policy','Settings > Policy > OMCP Policy - Update');
  -- 2021-03-29
insert into tb_codes values ('LOG-PT','log-PO-CR01','Create Project Policy','Settings > Policy > Project Policy - Policy Create');
insert into tb_codes values ('LOG-PT','log-PO-MD02','Modify Project Policy','Settings > Policy > Project Policy - Policy Update');

-- Vendors
insert into tb_codes values ('VENDOR','AWS','Cloud Service Vender - Amazon Wep Service','');
insert into tb_codes values ('VENDOR','GCP','Cloud Service Vender - Google Cloud Platform','');

--public cloud instance type
insert into tb_codes values ('EC2-TYPE','t2.nano','AWS EC2 t2.nano instance type','cpu:1,memory:0.5');
insert into tb_codes values ('EC2-TYPE','t2.micro','AWS EC2 t2.micro instance type','cpu:1,memory:1');
insert into tb_codes values ('EC2-TYPE','t2.small','AWS EC2 t2.small instance type','cpu:1,memory:2');
insert into tb_codes values ('EC2-TYPE','t2.medium','AWS EC2 t2.medium instance type','cpu:2,memory:4');
insert into tb_codes values ('EC2-TYPE','t2.large','AWS EC2 t2.large instance type','cpu:2,memory:8');
insert into tb_codes values ('EC2-TYPE','t2.xlarge','AWS EC2 t2.xlarge instance type','cpu:4,memory:16');
insert into tb_codes values ('EC2-TYPE','t2.2xlarge','AWS EC2 t2.2xlarge instance type','cpu:8,memory:32');
insert into tb_codes values ('EC2-TYPE','t3.nano','AWS EC2 t3.nano instance type','cpu:2,memory:0.5');
insert into tb_codes values ('EC2-TYPE','t3.micro','AWS EC2 t3.micro instance type','cpu:2,memory:1');
insert into tb_codes values ('EC2-TYPE','t3.small','AWS EC2 t3.small instance type','cpu:2,memory:2');
insert into tb_codes values ('EC2-TYPE','t3.medium','AWS EC2 t3.medium instance type','cpu:2,memory:4');
insert into tb_codes values ('EC2-TYPE','t3.large','AWS EC2 t2.large instance type','cpu:2,memory:8');
insert into tb_codes values ('EC2-TYPE','t3.xlarge','AWS EC2 t2.xlarge instance type','cpu:4,memory:16');
insert into tb_codes values ('EC2-TYPE','t3.2xlarge','AWS EC2 t2.2xlarge instance type','cpu:8,memory:32');
insert into tb_codes values ('AKS-TYPE','Standard_B1ms','Standard','cpu:1 / memory:2');
insert into tb_codes values ('AKS-TYPE','Standard_B1s','Standard','cpu:1 / memory:1');
insert into tb_codes values ('AKS-TYPE','Standard_B2ms','Standard','cpu:2 / memory:8');
insert into tb_codes values ('AKS-TYPE','Standard_B2s','Standard','cpu:2 / memory:4');
insert into tb_codes values ('EKS-TYPE','EKS.t2.large','AWS EKS t2.large instance type','cpu:2 / memory:8');
insert into tb_codes values ('EKS-TYPE','EKS.t2.micro','AWS EKS t2.micro instance type','cpu:1 / memory:1');
insert into tb_codes values ('EKS-TYPE','EKS.t2.small','AWS EKS t2.small instance type','cpu:1 / memory:2');
insert into tb_codes values ('EKS-TYPE','EKS.t3.large','AWS EKS t2.large instance type','cpu:2 / memory:8');
insert into tb_codes values ('EKS-TYPE','EKS.t3.medium','AWS EKS t3.medium instance type','cpu:2 / memory:4');
insert into tb_codes values ('EKS-TYPE','EKS.t3.micro','AWS EKS t3.micro instance type','cpu:2 / memory:1');
insert into tb_codes values ('EKS-TYPE','EKS.t3.small','AWS EKS t3.small instance type','cpu:2 / memory:2');

-- Dashboard module
INSERT INTO public.tb_codes(kinds, code, description, etc) VALUES ('DASHBOARD','DBCOMP01','System Status','');
INSERT INTO public.tb_codes(kinds, code, description, etc) VALUES ('DASHBOARD','DBCOMP02','Cluster Regions','');
INSERT INTO public.tb_codes(kinds, code, description, etc) VALUES ('DASHBOARDx','DBCOMP03','Management Clusters','');
INSERT INTO public.tb_codes(kinds, code, description, etc) VALUES ('DASHBOARD','DBCOMP04','World Cluster Status','');
INSERT INTO public.tb_codes(kinds, code, description, etc) VALUES ('DASHBOARD','DBCOMP05','Topology','');
INSERT INTO public.tb_codes(kinds, code, description, etc) VALUES ('DASHBOARDx','DBCOMP06','Cluster Topology','');
INSERT INTO public.tb_codes(kinds, code, description, etc) VALUES ('DASHBOARDx','DBCOMP07','Service Topology','');
INSERT INTO public.tb_codes(kinds, code, description, etc) VALUES ('DASHBOARDx','DBCOMP08','Service-Region Topology','');
INSERT INTO public.tb_codes(kinds, code, description, etc) VALUES ('DASHBOARD','DBCOMP09','Cluster Join/Unjoin','');
INSERT INTO public.tb_codes(kinds, code, description, etc) VALUES ('DASHBOARD','DBCOMP10','Cluster Power Usage','');
INSERT INTO public.tb_codes(kinds, code, description, etc) VALUES ('CONFIG', 'DASHBOARD-CYCLE', '5', 'Dashboard Refresh Cycle / Sec');
INSERT INTO public.tb_codes(kinds, code, description, etc) VALUES ('CONFIG', 'POWER-HIGH', '100', 'Power Usage Range 71~100');
INSERT INTO public.tb_codes(kinds, code, description, etc) VALUES ('CONFIG', 'POWER-MEDIUM', '70', 'Power Usage Range 31~70');
INSERT INTO public.tb_codes(kinds, code, description, etc) VALUES ('CONFIG', 'POWER-LOW', '30', 'Power Usage Range 0~30');


--tb_account_role
INSERT INTO public.tb_account_role VALUES ('admin', 'Administrator', 'System Administrator');
INSERT INTO public.tb_account_role VALUES ('user', 'User', 'Openmcp Portal User');

--tb_accounts
INSERT INTO public.tb_accounts VALUES ('openmcpadmin','$2b$10$nvkN2RtN5/8UNHhNEVGDiOF8WIwdiPp/P7SU/DibOtPzaRXUoBG8y','{admin}','2021-10-12 13:43:24','2021-10-12 13:43:24');

--oauth_clients
INSERT INTO public.oauth_clients(client_id, client_secret, redirect_uri) VALUES ('openmcp-client', 'openmcp-secret', 'http://localhost:3000/oauth/callback');

-- metering default regions 
 INSERT INTO public.tb_metering_cluster(region, cost, region_name, created_time, updated_time) VALUES ('KR', 0.1, 'Korea', current_timestamp, current_timestamp);
 INSERT INTO public.tb_metering_cluster(region, cost, region_name, created_time, updated_time) VALUES ('US', 0.1, 'US',current_timestamp, current_timestamp);
 INSERT INTO public.tb_metering_cluster(region, cost, region_name, created_time, updated_time) VALUES ('JP', 0.1, 'Japen',current_timestamp, current_timestamp);
 INSERT INTO public.tb_metering_cluster(region, cost, region_name, created_time, updated_time) VALUES ('HK', 0.1, 'Hongkong',current_timestamp,current_timestamp);
 INSERT INTO public.tb_metering_cluster(region, cost, region_name, created_time, updated_time) VALUES ('CN', 0.1, 'China',current_timestamp,current_timestamp);