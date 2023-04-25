drop table candidates cascade;
drop table recruiters cascade;
drop table companies cascade;
drop table skills cascade;
drop table experiences cascade;
drop table certificates cascade;
drop table allowed_recruiters_resumes cascade;
drop table candidates_skills cascade;
drop table jobs_skills cascade;
drop table jobs_applicants cascade;
drop table jobs cascade;
drop table fields cascade;
drop table resumes cascade;
drop table locations cascade;
drop type "roles";

CREATE TYPE roles AS ENUM ('candidate', 'recruiter');

create table skills (
	ID INT NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    name VARCHAR(100) NOT NULL,
	
	CONSTRAINT PK_SKILLS PRIMARY KEY(ID)
);

-- quan he 1 user co nhieu exp qua user_id
create table experiences (
	ID INT NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    position VARCHAR(100) NOT NULL,
	start VARCHAR(50) NOT NULL,
	finish VARCHAR(50) NOT NULL,
	company_id INT NOT NULL,
	user_id INT NOT NULL,
	
	CONSTRAINT PK_EXPERIENCES PRIMARY KEY(ID)
);

-- them chung chi cho candidate
CREATE TABLE certificates (
	ID INT NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	name VARCHAR(100) NOT NULL,
	verified_at timestamp not null,
	candidate_id INT NOT NULL,
	
	CONSTRAINT PK_EDUCATIONAL_INSTITUTIONS PRIMARY KEY(ID)
);

CREATE TABLE candidates (
	ID INT NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(100) NOT NULL,
	avatar varchar(1000),
	background varchar(1000),
	address_wallet VARCHAR(100) NOT NULL UNIQUE,
	full_name VARCHAR(100),
	email VARCHAR(100),
    phone varchar(100),
    about varchar(5000),
	role roles not null,
	CONSTRAINT pk_candidates PRIMARY KEY(ID)
);


CREATE TABLE recruiters (
	ID INT NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(100) NOT NULL,
	avatar varchar(1000),
	background varchar(1000),
	address_wallet VARCHAR(100) NOT NULL UNIQUE,
	full_name VARCHAR(100),
	email VARCHAR(100),
    phone varchar(100),
    company_id int,
	position varchar(100),
	role roles not null,

	CONSTRAINT pk_recruiters PRIMARY KEY(ID)
);

CREATE TABLE locations (
	ID INT NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	name VARCHAR(100) not null,

	CONSTRAINT pk_locations PRIMARY KEY(ID)
);

CREATE TABLE companies (
	ID INT NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    name VARCHAR(100) not null,
    logo VARCHAR(1000) not null,
    background VARCHAR(1000) not null,
    about varchar(1000) not null,
    scale VARCHAR(100),
    website VARCHAR(1000),
    location_id INT NOT NULL,
	address varchar(100),
	introduction varchar(100),

	CONSTRAINT pk_companies PRIMARY KEY(ID)
);


create table resumes (
	ID INT NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    data varchar(1000) not null,
    owner_id INT NOT NULL,
    title varchar(100),
    create_at timestamp not null,
	
	CONSTRAINT pk_resumes PRIMARY KEY(ID)
);


create table fields (
	ID INT NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    name varchar(100) not null,
	description varchar(5000),
	CONSTRAINT pk_job_types PRIMARY KEY(ID)
);

create table jobs (
	ID INT NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    title varchar(100) not null,
    location_id INT NOT NULL,
    job_type varchar(100) not null,
    experience int not null,
    requirements varchar(1000),
    benefits varchar(1000),
    create_at timestamp not null,
	update_at timestamp,
    company_id int not null,
	salary int not null,
	field_id INT NOT NULL,
	owner_id INT NOT NULL,
	CONSTRAINT pk_jobs PRIMARY KEY(ID)
);

create table jobs_applicants (
	job_id INT NOT NULL,
    applicant_id  INT NOT NULL,
	CONSTRAINT pk_jobs_applicants PRIMARY KEY(job_id,applicant_id)
);


create table jobs_skills (
	job_id INT  NOT NULL,
    skill_id INT  NOT NULL,
	CONSTRAINT pk_jobs_skills PRIMARY KEY(job_id,skill_id)
);


create table candidates_skills (
	candidate_id INT  NOT NULL,
    skill_id INT  NOT NULL,
	CONSTRAINT pk_candidates_skills PRIMARY KEY(candidate_id,skill_id)
);


create table allowed_recruiters_resumes (
	recruiter_id INT  NOT NULL,
	resume_id INT  NOT NULL,
	CONSTRAINT pk_allowed_recruiters_resumes PRIMARY KEY(recruiter_id,resume_id)
);

-- Add skills
INSERT INTO skills (name) VALUES
('Java'),
('Python'),
('React.js'),
('Node.js'),
('Vue.js'),
('Docker'),
('PostgreSQL'),
('AWS'),
('MySQL'),
('Solidity'),
('C/C++');


-- -- Add candidatess
-- INSERT INTO candidates (id, username, password, avatar, background, address_wallet, role, full_name, email, phone,about) VALUES
-- (1, 'johnsmith', 'password123', 'https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/122323993_2826579364245075_2935412686683344521_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2IR0mBj4QowAX8Zqs-Q&_nc_ht=scontent-hkg4-1.xx&oh=00_AfBDxsYgtD6KS0oTVyxono1V5fwidE3wAH46ZjjPVLChJQ&oe=643F9A68', 'https://cdn.mind-diagnostics.org/uploads/mind-diagnostics/images/image/url/loving-someone-you-cant-have-how-to-let-go-1_.jpg.jpg', '0x1234567890123456', 'candidate', 'John Smith', 'jsmith@gmail.com', '123-456-7890','Experienced full-stack developer'),
-- (2, 'janedoe', 'password456', 'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/333056183_1290082211851708_8481232394679087721_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=174925&_nc_ohc=vSYu4lu23BIAX9TBaj9&_nc_ht=scontent-hkg4-1.xx&oh=00_AfBrsnAhux2pNF6V1xfTQP9FydKbljw1c3SbCoclBooVuA&oe=641DE24F', 'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg', '0xabcdef1234567890', 'candidate', 'Jane Doe', 'jdoe@gmail.com', null,'Recent graduate seeking an entry-level position as a software engineer');


-- -- Add recruiters
-- INSERT INTO recruiters(id, username, password, avatar, background, address_wallet, role, full_name, email, phone, company_id,position) VALUES
-- (3, 'bobrecruiter', 'password789', 'https://static.toiimg.com/thumb/msid-83335623,width-800,height-600,resizemode-75,imgsize-690633,pt-32,y_pad-40/83335623.jpg','https://img.freepik.com/premium-vector/mountain-green-field-alpine-landscape-nature-with-wooden-houses_194708-1779.jpg?w=2000', '0xbobrecruiterwalletaddress', 'recruiter', 'Bob Recruiter', 'bob@company.com', '555-123-4567', 1, 'Recruiter at Google Company');


-- -- Add experiences
-- INSERT INTO experiences (position, start, finish, company_id, user_id) VALUES
-- ('Full-stack Developer', '07/2020', '07/2022', 1, 1),
-- ('React.js Developer', '11/2022', '02/2023', 1, 1),
-- ('Node.js Developer Intern', '09/2022', '02/2023', 2, 2),
-- ('Backend Python Developer Intern', '01/2021', '04/2022', 2, 2),
-- ('Recruiter', '06/2022', 'Now', 3, 3);

-- -- Add certs
-- INSERT INTO certificates (name, verified_at, candidate_id) VALUES
-- ('Bachelors degree in Computer Science from XYZ University', '2020-01-01', 1),
-- ('650 TOEIC', '2020-01-01', 1),
-- ('Fullstack Udemy Certidicate', '2020-08-01', 1),
-- ('Master degree in Software Engineering from ABC University', '2022-01-01', 2),
-- ('Node.js Certificate', '2022-06-01', 2);


-- Add locations
INSERT INTO locations (name) VALUES
('TP.Hồ Chí Minh'),
('Hà Nội'),
('Đà Nẵng'),
('Nha Trang');

-- Add companies
INSERT INTO companies (id, name, logo, background, about, scale, website, location_id, address, introduction) VALUES
(1, 'Google', 'https://cdn-icons-png.flaticon.com/512/281/281764.png?w=740&t=st=1678987111~exp=1678987711~hmac=d5b56dfe9ae4ede505dfcfcd33b37138ca4f8bdbc812b96d3fd9e4a7be021609', 'https://goldidea.vn/upload/y-nghia-logo-google.jpg', 'Google is a multinational technology company specializing in Internet-related services and products.', '1000 - 5000 nhân viên', 'https://www.google.com', 1,'35 Xô Viết Nghệ Tĩnh, Quận 9',null),

(2, 'Facebook', 'https://www.mhafbfun.com/wp-content/uploads/2017/12/Facebook-Logo-Square-768x768-1.png', 'https://1000logos.net/wp-content/uploads/2016/11/Facebook-Logo-Meaning.jpg', 'Founded in 2004, Facebook’s mission is to give people the power to build community and bring the world closer together.', '1000 - 5000 nhân viên', 'https://www.facebook.com', 1 ,null,'46 Bùi Thị Xuân, Quận 1'),

(3, 'Amazon', 'https://companieslogo.com/img/orig/AMZN-e9f942e4.png?t=1632523695', 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', 'Amazon.com, Inc. is an American multinational technology company based in Seattle, Washington, which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.', '1000 - 5000 nhân viên', 'https://www.amazon.com', 2,'112 Trần Văn Ơn, Quận 5',null),

(4, 'Hitachi Vantara', 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMkcvR3c9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--b942ca3ef660be7577e778575d1af516f62e253f/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oSnlaWE5wZW1WZmRHOWZabWwwV3dkcEFhb3ciLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--c92dff459e15c825e59a28180a8a086f8ec53bcd/Logo.png', 'https://modernising-justice.co.uk/wp-content/uploads/2020/06/hitachi-inspire-next-logo.png', 'Amazon.com, Inc. is an American multinational technology company based in Seattle, Washington, which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.', '1000 - 5000 nhân viên', 'https://www.qtsc.com.vn/business/detail/74', 1,'4th Floor, Helios Building, Quang Trung Software City Ward, Tân Chánh Hiệp, Quận 12',null),

(5, 'DXC Company', 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBemJFSGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c9c6112f7029be8e059b5b863a381f8229833797/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oSnlaWE5wZW1WZmRHOWZabWwwV3dkcEFhb3ciLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--c92dff459e15c825e59a28180a8a086f8ec53bcd/DXC%20Logo_Purple+Black%20RGB.png', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2s0HjjvLpn_jUgLY_afWGkw8Kv9xbqMFKag&usqp=CAU', 'Amazon.com, Inc. is an American multinational technology company based in Seattle, Washington, which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.', '1000 - 5000 nhân viên', 'https://dxc.com/us/en', '2','4th Floor, Helios Building, Quang Trung Software City Ward, Tân Chánh Hiệp, Quận 12',null);

-- -- Add CVs
-- INSERT INTO resumes (owner_id, data, title, create_at) VALUES
-- (1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum libero id dui tincidunt viverra.', 'John Smith - Full-stack Developer', '2022-05-09 14:33:10'),
-- (1, 'Suspendisse commodo pellentesque neque, eu euismod velit eleifend quis. Maecenas posuere placerat finibus.', 'John Smith - Full-stack Developer (Version 2)', '2022-07-21 08:52:45'),
-- (2, 'Vivamus eget ante leo. Curabitur gravida mauris eu nisl luctus, et eleifend tortor rhoncus. Nulla sollicitudin, turpis vitae ultrices scelerisque, eros metus maximus erat, sed volutpat est nunc nec nibh.', 'Jane Doe - Software Engineer', '2022-07-21 08:52:45');


INSERT INTO fields (name,description) VALUES
('Lập trình/ IT/ CNTT/ Engineering','This is a Job'),
('Nhân sự/ Human Resource/ HR','This is a Job'),
('Tài chính/ Finance','This is a Job'),
('Thiết kế/ Design','This is a Job'),
('Project Manager/ Product Management/ Giám đốc sản phẩm','This is a Job');

-- Add jobs
-- INSERT INTO jobs (id, title , location_id, job_type, experience, requirements, benefits, create_at, company_id,update_at,salary, field_id) VALUES
-- (1, 'Software Engineer (Full-stack)', 1, 'Full-time', 25, 'Experience with Java, React.js and Node.js required. Master degree in Computer Science or related field preferred.', 'Health insurance, gym membership, flexible schedule, 401k', '2023-02-02 12:44:05', 1,null,5000000, 3),
-- (2, 'Data Analyst', 2, 'Full-time',24, 'Experience with Python, SQL and machine learning libraries required. Bachelor degree in Math, Statistics or related field preferred.', 'Stock options, remote work, 401k matching', '2024-06-19 22:16:55', 2,null,5000000, 2),
-- (3, 'Backend Engineer', 1, 'Full-time', 36, 'Experience with Java, React.js and Node.js required. Master degree in Computer Science or related field preferred.', 'Health insurance, gym membership, flexible schedule, 401k', '2023-01-02 12:44:05', 1,null,8000000, 1),
-- (4, 'Frontend Developer', 2, 'Full-time', 48, 'Experience with Java, React.js and Node.js required. Master degree in Computer Science or related field preferred.', 'Health insurance, gym membership, flexible schedule, 401k', '2023-01-02 12:44:05', 1,null,8000000, 1),
-- (5, 'Backend Engineer', 3, 'Full-time', 50, 'Experience with Java, React.js and Node.js required. Master degree in Computer Science or related field preferred.', 'Health insurance, gym membership, flexible schedule, 401k', '2023-01-02 12:44:05', 1,null,8000000, 3),
-- (6, 'Devops Engineer', 1, 'Full-time', 6, 'Experience with Java, React.js and Node.js required. Master degree in Computer Science or related field preferred.', 'Health insurance, gym membership, flexible schedule, 401k', '2023-01-02 12:44:05', 1,null,8000000, 2),
-- (7, 'Security Engineer', 2, 'Full-time', 0, 'Experience with Java, React.js and Node.js required. Master degree in Computer Science or related field preferred.', 'Health insurance, gym membership, flexible schedule, 401k', '2023-01-02 12:44:05', 1,null,3000000, 1),
-- (8, 'Backend Engineer', 2, 'Full-time', 50, 'Experience with Java, React.js and Node.js required. Master degree in Computer Science or related field preferred.', 'Health insurance, gym membership, flexible schedule, 401k', '2023-01-02 12:44:05', 1,null,8000000, 3),
-- (9, 'Python Developer', 1, 'Full-time', 60, 'Experience with Java, React.js and Node.js required. Master degree in Computer Science or related field preferred.', 'Health insurance, gym membership, flexible schedule, 401k', '2023-01-02 12:44:05', 1,null,8000000, 4),
-- (10, 'Java Engineer', 3, 'Full-time', 62, 'Experience with Java, React.js and Node.js required. Master degree in Computer Science or related field preferred.', 'Health insurance, gym membership, flexible schedule, 401k', '2023-01-02 12:44:05', 1,null,8000000, 4),
-- (11, 'Java Dev', 3, 'Part-time', 99, 'Experience with Java, React.js and Node.js required. Master degree in Computer Science or related field preferred.', 'Health insurance, gym membership, flexible schedule, 401k', '2023-01-02 12:44:05', 1,null,8000000, 4),
-- (12, 'DepOps Engineer', 3, 'Intern', 62, 'Experience with Java, React.js and Node.js required. Master degree in Computer Science or related field preferred.', 'Health insurance, gym membership, flexible schedule, 401k', '2023-01-02 12:44:05', 1,null,8000000, 4);


-- -- Add job applicants
-- INSERT INTO jobs_applicants (job_id, applicant_id) VALUES
-- (1, 2),
-- (1, 1),
-- (2, 1);

-- -- Add job skills
-- INSERT INTO jobs_skills (job_id, skill_id) VALUES
-- (1, 1),
-- (1, 3),
-- (2, 2),
-- (2, 9);

-- -- Add candidate skills
-- INSERT INTO candidates_skills (candidate_id, skill_id) VALUES
-- (1, 1),
-- (1, 3),
-- (1, 4),
-- (2, 2),
-- (2, 9);

-- INSERT INTO allowed_recruiters_resumes (recruiter_id, resume_id) VALUES
-- (3, 2),
-- (3, 3);