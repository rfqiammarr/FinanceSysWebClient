import { useState } from 'react';
import {
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Stack,
} from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak sesuai');
      return;
    }

    setLoading(true);

    try {
      // TODO: Implementasi register API
      console.log('Register attempt:', {
        fullName: formData.fullName,
        email: formData.email,
      });

      // Simulated register - replace dengan API call
      if (
        formData.fullName &&
        formData.email &&
        formData.password &&
        formData.confirmPassword
      ) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Register error:', error);
      setError('Gagal melakukan registrasi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" mb={10}>
        Daftar Akun
      </Title>
      <Text c="dimmed" size="sm" ta="center" mb={30}>
        Sudah punya akun?{' '}
        <Anchor to="/login" component={Link} size="sm">
          Login di sini
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            {error && (
              <Text c="red" size="sm">
                {error}
              </Text>
            )}

            <TextInput
              label="Nama Lengkap"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.currentTarget.value)}
              required
            />

            <TextInput
              label="Email"
              placeholder="your@email.com"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.currentTarget.value)}
              required
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.currentTarget.value)}
              required
            />

            <PasswordInput
              label="Konfirmasi Password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleChange('confirmPassword', e.currentTarget.value)
              }
              required
            />

            <Button fullWidth type="submit" loading={loading}>
              Daftar
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
