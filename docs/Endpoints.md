## Endpoints  📌

### Auth

```rust
POST /api/auth/register
{
    "email": "johndoe@gmail.com", 
    "password": "Password123", 
    "isTeacher": "true"
}
```

### Teacher

```rust
POST /api/teacher/delete
{
    "email": "johndoe@gmail.com", 
}
```

```rust
POST /api/teacher/duplicate-sheet
{
    "sheetId": "------", 
    "teacher": "johndoe@gmail.com", 
    "commission": "------", 
    "subject": "maths"
}
```

### Assistant

```rust
POST /api/assistant/delete
{
    "email": "johndoe@gmail.com", 
}
```

```rust
PUT /api/assistant/assign/subject
{
    "teacherEmail": "johndoe@gmail.com",
    "assistantEmail": "janedoe@gmail.com",
    "commission": "------", 
    "subject": "maths"
}
```

### Students

```rust
PUT /api/students/
{
    "sheetId": "xxxxxxxxxxxxxxxxx", 
    "teacher": "johndoe@gmail.com", 
}
```

```rust
PUT /api/students/attendance
{
    "sheetId": "------", 
    "teacher": "johndoe@gmail.com", 
    "commission": "------", 
    "subject": "maths"
    "date": "dd-mm-yyyy"
}
```
