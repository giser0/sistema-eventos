import api from './api';

export const localService = {

  getAll: async () => {
    const res = await api.get('/locales');
    return res.data;
  },

  getById: async (id: number) => {
    const res = await api.get('/locales');
    return res.data.find(
      (l: any) => l.id_local === id
    );
  },

  update: async (id: number, data: any) => {
    const res = await api.patch(`/locales/${id}`, {
      nombre: data.nombre,
      direccion: data.direccion,
      telefono: data.telefono,
      capacidad: data.capacidad,
      precio: data.precio,
    });
    return res.data;
  }

};