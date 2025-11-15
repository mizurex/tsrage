# tsrage

A typesafe localStorage wrapper with TypeScript schema validation.

## Installation

```bash
npm install tsrage
```

## Usage

```typescript
import { TStorage } from 'tsrage';

// Define your storage schema
type UserSchema = {
  name: string;
  email: string;
  age:number;
};

// Create a typed storage instance
const storage = new TStorage<UserSchema>();

// Set items 
storage.setItem('name', 'John Doe');
storage.setItem('age',20);

// Get items
const name = storage.getItem('name'); // string | null

// Check if key exists
if (storage.IsExist('name')) {
  console.log('Name is stored!');
}

// Remove items
storage.removeItem('name');

// Clear all storage
storage.clear();
```

## API

### `TStorage<Schema>`

Creates a new typed storage instance.

#### Methods

- **`setItem<K>(key: K, value: Schema[K]): void`**  
  Stores a value with type checking.

- **`getItem<K>(key: K): Schema[K] | null`**  
  Retrieves a value with proper typing.

- **`removeItem<K>(key: K): void`**  
  Removes a specific item.

- **`IsExist<K>(key: K): boolean`**  
  Checks if a key exists in storage.

- **`clear(): void`**  
  Removes all items from storage.


