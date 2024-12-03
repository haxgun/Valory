<div align="center">

# Backend
</div>
---

## 📦 Requirements  

To run the backend, you will need the following dependencies installed:  

- **Python 3.12+**: Core language for the backend.  
- **Package Manager**: [**uv**](https://github.com/yaqwsx/uv), a lightweight dependency manager for Python projects.  

### Install dependencies  
Run the following command to set up your environment:  
```bash
uv install
```

This will automatically install all required dependencies listed in `uv.lock`.

## 📦 Key Dependencies  

The backend uses the following libraries to ensure seamless functionality and robust performance:  

| Dependency                 | Version      | Purpose                                                                 |
|----------------------------|--------------|-------------------------------------------------------------------------|
| **aiosqlite**              | `>=0.20.0`   | Async driver for SQLite, used in debug mode.                           |
| **alembic**                | `>=1.14.0`   | Database migrations and version control.                               |
| **asyncpg**                | `>=0.30.0`   | High-performance async PostgreSQL driver.                              |
| **fastapi[standard]**      | `>=0.115.5`  | Web framework for building REST APIs.                                  |
| **greenlet**               | `>=3.1.1`    | Concurrency support for SQLAlchemy.                                    |
| **psycopg2-binary**        | `>=2.9.10`   | PostgreSQL database adapter for production.                            |
| **python-dotenv**          | `>=1.0.1`    | Environment variable management.                                       |
| **sqlalchemy**             | `>=2.0.36`   | ORM and SQL toolkit for database interactions.                         |
| **sqlmodel**               | `>=0.0.22`   | A layer on top of SQLAlchemy for defining database models.             |
| **uuid**                   | `>=1.30`     | Universally unique identifier generation.                              |
| **uvicorn**                | `>=0.32.1`   | ASGI server for running FastAPI applications.                          |  

These dependencies are automatically installed with the `uv install` command as specified in the `uv.lock` file.  

## 🛠 General Workflow  

### 1. **Setup Environment**  
1. Clone the repository:  
   ```bash
   git clone https://github.com/haxgun/Valory.git
   cd backend
   ```
2. Install dependencies:
    ```bash
    uv install
    ```
   
3. Create a .env file to configure environment variables. Example:
    ```env
    DEBUG=True

    PROJECT_NAME="My app"
    VERSION="1.0.0"
    
    DATABASE_URL="postgresql+asyncpg://postgres:postgres@localhost:5432/"
    DEGUB_DATABASE_URL="sqlite+aiosqlite:///sqlite.db" 
    ```

4. Run the Application
    ```bash
   uv sync
   uv run uvicorn main:app --reload
   ```

## 🛡 API Documentation  

The backend provides an auto-generated, interactive API documentation accessible at:  
- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)  
- ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)  

Explore endpoints, test requests, and understand API details conveniently!