export default function Home() {
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>tsrage</h1>
        <p style={styles.subtitle}>Type-safe localStorage wrapper for TypeScript</p>
        <code style={styles.installBadge}>npm install tsrage</code>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Quick Start */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Quick Start</h2>
          <pre style={styles.codeBlock}>
            <code>{`import { TStorage } from 'tsrage';

// Define your schema
type UserSchema = {
  username: string;
  email: string;
  theme: 'light' | 'dark';
};

// Create typed storage
const storage = new TStorage<UserSchema>();

// Type-safe operations
storage.setItem('username', 'john_doe');
storage.setItem('theme', 'dark');

// Get with proper typing
const user = storage.getItem('username'); // string | null

// Check existence
if (storage.hasItem('username')) {
  console.log('User exists!');
}

// Remove or clear
storage.removeItem('email');
storage.clear();`}</code>
          </pre>
        </section>

      

        {/* API */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>API Reference</h2>
          <div style={styles.apiList}>
            <div style={styles.apiItem}>
              <code style={styles.apiMethod}>setItem(key, value)</code>
              <p style={styles.apiDescription}>Store a value with type checking</p>
            </div>
            <div style={styles.apiItem}>
              <code style={styles.apiMethod}>getItem(key)</code>
              <p style={styles.apiDescription}>Retrieve a value with proper typing</p>
            </div>
            <div style={styles.apiItem}>
              <code style={styles.apiMethod}>removeItem(key)</code>
              <p style={styles.apiDescription}>Remove a specific item from storage</p>
            </div>
            <div style={styles.apiItem}>
              <code style={styles.apiMethod}>hasItem(key)</code>
              <p style={styles.apiDescription}>Check if a key exists in storage</p>
            </div>
            <div style={styles.apiItem}>
              <code style={styles.apiMethod}>clear()</code>
              <p style={styles.apiDescription}>Remove all items from storage</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>Made by jay</p>
        <a href="https://www.npmjs.com/package/tsrage" target="_blank" rel="noopener noreferrer" style={styles.link}>
          View on npm
        </a>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    color: '#1a1a1a',
  },
  header: {
    textAlign: 'center' as const,
    padding: '80px 20px 60px',
    backgroundColor: '#abdcf2',
    color: '#000000',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '500',
    margin: '0',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '1.3rem',
    margin: '16px 0 32px',
    fontWeight: '400',
    opacity: 0.95,
  },
  installBadge: {
    display: 'inline-block',
    padding: '10px 24px',
    backgroundColor: '#ffffff',
    color: '#4a90e2',
    borderRadius: '3px',
    fontSize: '1rem',
    fontWeight: '500',
  },
  main: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '60px 20px',
  },
  section: {
    marginBottom: '80px',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '24px',
    color: '#2c3e50',
  },
  codeBlock: {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '28px',
    borderRadius: '3px',
    overflow: 'auto',
    fontSize: '0.95rem',
    lineHeight: '1.7',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '24px',
  },
  apiList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  apiItem: {
    padding: '10px 24px',
    backgroundColor: '#ffffff',
    borderLeft: '4px solid #4a90e2',
    borderRadius: '3px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
  },
  apiMethod: {
    display: 'inline-block',
    fontSize: '1.05rem',
    fontWeight: '600',
    color: '#4a90e2',
    fontFamily: 'monospace',
    marginBottom: '8px',
  },
  apiDescription: {
    fontSize: '0.95rem',
    color: '#7f8c8d',
    margin: '0',
    lineHeight: '1.5',
  },
  footer: {
    textAlign: 'center' as const,
    padding: '40px 20px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e5e7eb',
  },
  footerText: {
    margin: '0 0 12px 0',
    color: '#7f8c8d',
    fontSize: '0.95rem',
  },
  link: {
    color: '#4a90e2',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.95rem',
  },
}
