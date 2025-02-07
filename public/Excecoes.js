// Exceções personalizadas

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.stack = (new Error()).stack;
    }
}

class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DatabaseError';
        this.stack = (new Error()).stack;
    }
}

class OperationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'OperationError';
        this.stack = (new Error()).stack;
    }
}

// Exporte as classes para que possam ser usadas em outros arquivos
export { ValidationError, DatabaseError, OperationError };