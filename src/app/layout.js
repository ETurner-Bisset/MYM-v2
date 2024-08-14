import './globals.css';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Manage Your Meds',
  description:
    'Set and manage reminders from reordeing your prescriptions and taking your medications.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="modal"></div>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
