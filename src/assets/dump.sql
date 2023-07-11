CREATE TABLE IF NOT EXISTS profesor(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    correo TEXT PRIMARY KEY, 
    nombre TEXT, 
    apellido TEXT, 
    direccion TEXT,
    pass TEXT
);


INSERT or IGNORE INTO profesor(id, correo, nombre, apellido, direccion, pass) VALUES (1, 'profesor@test.cl', 'Victoria', 'Ojeda', 'congui', 'profesor');
INSERT or IGNORE INTO profesor(id, correo, nombre, apellido, direccion, pass) VALUES (2, 'profesor2@test.cl', 'Victoria', 'Ojeda', 'congui', 'profesor');

CREATE TABLE IF NOT EXISTS curso(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT PRIMARY KEY, 
    id_profesor INTEGER
);

INSERT or IGNORE INTO curso(id, nombre, id_user) VALUES (1, 'kinder', 1);
INSERT or IGNORE INTO curso(id, nombre, id_user) VALUES (2, 'primero', 2);

CREATE TABLE IF NOT EXISTS alumno(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rut TEXT PRIMARY KEY,  
    nombre TEXT,  
    edad TEXT
);

INSERT or IGNORE INTO alumno(id, rut, nombre, edad) VALUES (1, '11.121.112-3', 'Juan Pinto', '12');
INSERT or IGNORE INTO alumno(id, rut, nombre, edad) VALUES (2, '9.121.112-3', 'Juana Pintos', '12');

CREATE TABLE IF NOT EXISTS alumno_curso(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_alumno INTEGER,  
    id_curso INTEGER,  
);

INSERT or IGNORE INTO alumno_curso(id, id_alumno, id_curso) VALUES (1, 1, 1);
INSERT or IGNORE INTO alumno_curso(id, id_alumno, id_curso) VALUES (2, 2, 2);

CREATE TABLE IF NOT EXISTS asignatura(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descripcion TEXT,  
    id_profesor INTEGER,  
);

INSERT or IGNORE INTO asignatura(id, descripcion, id_profesor) VALUES (1, 'Ingles', 1);
INSERT or IGNORE INTO asignatura(id, descripcion, id_profesor) VALUES (2, 'Matematicas', 2);

CREATE TABLE IF NOT EXISTS curso_asignatura(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_asignatura INTEGER,  
    id_curso INTEGER,  
);

INSERT or IGNORE INTO curso_asignatura(id, id_asignatura, id_curso) VALUES (1, 'Ingles', 1);
INSERT or IGNORE INTO curso_asignatura(id, id_asignatura, id_curso) VALUES (2, 'Matematicas', 2);

CREATE TABLE IF NOT EXISTS evaluacion(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descripcion TEXT,  
    id_profesor INTEGER,  
    id_asignatura INTEGER,  
);

INSERT or IGNORE INTO curso_asignatura(id, descripcion, id_profesor, id_asignatura) VALUES (1, 'Unidad 1', 1, 1);
INSERT or IGNORE INTO curso_asignatura(id, descripcion, id_profesor, id_asignatura) VALUES (2, 'Suma', 2, 2);

CREATE TABLE IF NOT EXISTS nota(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nota REAL,  
    id_curso INTEGER,  
    id_evaluacion INTEGER,  
    id_alumno INTEGER,  
);

INSERT or IGNORE INTO nota(id, nota, id_curso, id_evaluacion, id_alumno) VALUES (1, 5.0, 1, 1, 1);
INSERT or IGNORE INTO nota(id, nota, id_curso, id_evaluacion, id_alumno) VALUES (2, 6.0, 2, 2, 2);
