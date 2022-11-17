## Endpoints  🎯

```
https://us-central1-asistencia-utn.cloudfunctions.net/api
```

### Auth

```rust
POST /auth/register
{
    "email": "johndoe@gmail.com", 
    "password": "Password123", 
    "isTeacher": -----
}
```

### Teacher

```rust
POST /teacher/delete
{
    "email": "johndoe@gmail.com", 
}
```

```rust
POST /teacher/duplicate-sheet
{
    "sheetId": "------", 
    "teacher": "johndoe@gmail.com", 
    "commission": "------", 
    "subject": "maths"
}
```

### Assistant

```rust
POST /assistant/delete
{
    "email": "johndoe@gmail.com", 
}
```

```rust
PUT /assistant/assign/subject
{
    "teacherEmail": "johndoe@gmail.com",
    "assistantEmail": "janedoe@gmail.com",
    "commission": "------", 
    "subject": "maths"
}
```

### Students

```rust
PUT /students/
{
    "sheetId": "------", 
    "teacher": "johndoe@gmail.com", 
}
```

```rust
PUT /students/attendance
{
    "sheetId": "------", 
    "teacher": "johndoe@gmail.com", 
    "commission": "------", 
    "subject": "maths"
    "date": "dd-mm-yyyy"
}
```
