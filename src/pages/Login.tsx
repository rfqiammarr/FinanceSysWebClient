import { useState } from 'react';
import {
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Group,
  Anchor,
  Stack,
} from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implementasi login API
      console.log('Login attempt:', { email, password });

      // Simulated login - replace dengan API call
      if (email && password) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" mb={10}>
        Login
      </Title>
      <Text c="dimmed" size="sm" ta="center" mb={30}>
        Belum punya akun?{' '}
        <Anchor to="/register" component={Link} size="sm">
          Daftar di sini
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Email"
              placeholder="your@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
            />

            <Group justify="space-between" mt="md">
              <Anchor component="button" type="button" c="dimmed" size="xs">
                Lupa password?
              </Anchor>
            </Group>

            <Button fullWidth type="submit" loading={loading}>
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
