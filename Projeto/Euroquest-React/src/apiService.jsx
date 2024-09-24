import axios from 'axios';

const API_ADMIN_URL = 'http://localhost:8080/euro';


// Areas Themes

export const getAreas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/theme`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch areas:', error);
    throw error;
  }
};

export const addArea = async (newArea) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/theme`, newArea);
    return response.data;
  } catch (error) {
    console.error('Failed to add area:', error);
    throw error;
  }
};

export const updateArea = async (areaId, updatedArea) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/admin/theme/${areaId}`, updatedArea);
    return response.data;
  } catch (error) {
    console.error('Failed to update area:', error);
    throw error;
  }
};

export const deleteArea = async (areaId) => {
  try {
    await axios.delete(`${API_BASE_URL}/admin/theme/${areaId}`);
  } catch (error) {
    console.error('Failed to delete area:', error);
    throw error;
  }
};


// Trilhas

export const getTrilhaCount = async (areaId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/theme/${areaId}/trail`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch trilha count:', error);
    throw error;
  }
};

export const addTrilha = async (areaId, newTrilha) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/theme/${areaId}/trail`, newTrilha);
    return response.data;
  } catch (error) {
    console.error('Failed to add trilha:', error);
    throw error;
  }
};

export const updateTrilha = async (trilhaId, updatedTrilha) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/admin/theme/${areaId}/trail/${trilhaId}`, updatedTrilha);
    return response.data;
  } catch (error) {
    console.error('Failed to update trilha:', error);
    throw error;
  }
};

export const deleteTrilha = async (trilhaId) => {
  try {
    await axios.delete(`${API_BASE_URL}/admin/theme/${areaId}/trail/${trilhaId}`);
  } catch (error) {
    console.error('Failed to delete trilha:', error);
    throw error;
  }
};


// Exercicios

export const getExercicioCount = async (trilhaId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/theme/${areaId}/trail/${trilhaId}/question`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch exercicio count:', error);
    throw error;
  }
};

export const addExercicio = async (trilhaId, newExercicio) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/theme/${areaId}/trail/${trilhaId}/question`, newExercicio);
    return response.data;
  } catch (error) {
    console.error('Failed to add exercicio:', error);
    throw error;
  }
};

export const updateExercicio = async (trilhaId, exercicioId, updatedExercicio) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/admin/theme/${areaId}/trail/${trilhaId}/question/${exercicioId}`, updatedExercicio);
    return response.data;
  } catch (error) {
    console.error('Failed to update exercicio:', error);
    throw error;
  }
};

export const deleteExercicio = async (trilhaId, exercicioId) => {
  try {
    await axios.delete(`${API_BASE_URL}/admin/theme/${areaId}/trail/${trilhaId}/question/${exercicioId}`);
  } catch (error) {
    console.error('Failed to delete exercicio:', error);
    throw error;
  }
};
