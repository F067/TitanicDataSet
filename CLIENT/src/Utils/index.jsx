import axios from 'axios'

export const callPost = async (url, data) => {
  try {
    const response = await axios.post("http://localhost:3001" + url, data);

    if (response.status === 201) {
      // La requête a été traitée avec succès
      return response.data;
    } else {
      // La requête a échoué avec un statut autre que 201
      throw new Error( response.status);
    }
  } catch (error) {
    // Une erreur s'est produite lors de la requête
    if (error.response && error.response.data && error.response.data.error) {
      // Si le backend a renvoyé un message d'erreur
      throw new Error( error.response.data.error);
    } else {
      console.log(error)
      // Si aucune erreur spécifique du backend n'est disponible
      throw new Error( error.message);
    }
  }
}


export const callGet = async (url) => {
  try {
    const response = await axios.get("http://localhost:3001" + url);

    if (response.status === 200) {
      // La requête a été traitée avec succès
      return response.data;
    } else {
      // La requête a échoué avec un statut autre que 200
      throw new Error(response.status);
    }
  } catch (error) {
    // Une erreur s'est produite lors de la requête
    if (error.response && error.response.data && error.response.data.error) {
      // Si le backend a renvoyé un message d'erreur
      throw new Error(error.response.data.error);
    } else {
      // Si aucune erreur spécifique du backend n'est disponible
      throw new Error(error.message);
    }
  }
};

