INSERT INTO departments (department_name)
VALUES
    ('Engineering'),
    ('Accounting'),
    ('Human Resources'),
    ('Interns');

INSERT INTO roles(title, salary, department_id)
VALUES
    ('Software Engineer', 90000, 1),
    ('Web Developer', 90000, 1),
    ('Computer Engineer', 90000, 1),

    ('Financial Analyst', 80000, 2),
    ('Accountant', 80000, 2),
    ('CPA', 100000, 2),

    ('HR director', 60000, 3),
    ('Vice president of HR', 90000, 3),

    ('Engineering Intern', 40000, 4),
    ('Accounting Intern', 40000, 4),
    ('HR Intern', 40000, 4);

    INSERT INTO employees (first_name, last_name, role_id, manager)
    VALUES
        ('Tony', 'Stark', 1, 'Nick Fury'),
        ('Steve', 'Rogers', 2, 'Nick Fury'),
        ('Proxima', 'Midnight', 3, 'Thanos'),
        ('Corvus', 'Glave', 4, 'Thanos');