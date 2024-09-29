import React, { useState } from 'react';

const SettingsContent = () => {
  const [username, setUsername] = useState('User');
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Configurações do Usuário</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center mb-4">
          {profileImage ? (
            <img
              src={profileImage}
              alt="User Profile"
              className="w-24 h-24 rounded-full mb-2"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 mb-2 flex items-center justify-center">
              <span className="text-gray-500">Sem Imagem</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />
        </div>
        <label className="block text-lg font-semibold mb-2" htmlFor="username">
          Nome do Usuário
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleNameChange}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

export default SettingsContent;
