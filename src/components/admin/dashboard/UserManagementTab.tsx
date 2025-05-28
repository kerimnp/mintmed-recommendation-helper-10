
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Users, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface UserProfile {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  specialization: string | null;
  // user_roles: { role: string }[]; // For future use
}

interface UserManagementTabProps {
  searchTerm?: string;
}

export const UserManagementTab: React.FC<UserManagementTabProps> = ({ searchTerm }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [internalSearchTerm, setInternalSearchTerm] = useState("");

  useEffect(() => {
    // Use external admin dashboard search term if provided
    setInternalSearchTerm(searchTerm || "");
  }, [searchTerm]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: supabaseError } = await supabase
          .from('profiles')
          .select(`
            id,
            email,
            first_name,
            last_name,
            specialization
          `);

        if (supabaseError) {
          throw supabaseError;
        }
        setUsers(data || []);
      } catch (err: any) {
        console.error("Error fetching users:", err);
        setError(err.message || 'Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const lowerSearchTerm = internalSearchTerm.toLowerCase();
    const filtered = users.filter(user => {
      return (user.email?.toLowerCase().includes(lowerSearchTerm) ||
              user.first_name?.toLowerCase().includes(lowerSearchTerm) ||
              user.last_name?.toLowerCase().includes(lowerSearchTerm) ||
              user.specialization?.toLowerCase().includes(lowerSearchTerm)
      );
    });
    setFilteredUsers(filtered);
  }, [internalSearchTerm, users]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-medical-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <AlertCircle className="h-5 w-5" /> Error Loading Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 dark:text-red-300">{error}</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Please check the console for more details or try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>View and manage user accounts. User roles display will be added soon.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input 
            placeholder="Search users by name, email, or specialization..."
            value={internalSearchTerm}
            onChange={(e) => setInternalSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        {filteredUsers.length === 0 && !loading ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Users className="h-12 w-12 mx-auto mb-2" />
            <p>No users found matching your criteria.</p>
          </div>
        ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Status</TableHead> {/* Placeholder for status */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.first_name || ''} {user.last_name || ''}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.specialization || 'N/A'}</TableCell>
                  <TableCell><Badge variant="outline">Active</Badge></TableCell> {/* Placeholder */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        )}
      </CardContent>
    </Card>
  );
};

