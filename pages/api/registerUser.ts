import axios from "axios";

interface RegisterData {
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  password: string;
}

export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await axios.post(
      "http://localhost:1337/auth/local/register",
      {
        firstname: userData.firstName,
        lastname: userData.lastName,
        email: userData.email,
        password: userData.password,
        birthdate: userData.birthdate,
        username: `${userData.firstName.toLowerCase()}${userData.lastName.toLowerCase()}`, // Beispiel für Benutzername aus Vorname und Nachname
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Registrierung fehlgeschlagen."
    );
  }
};
