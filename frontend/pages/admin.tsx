import React, { useState } from 'react';
import { Plus, Trash2, Upload, Tag, Zap, Image as ImageIcon } from 'lucide-react';

type Tag = {
    id: number;
    name: string;
    difficulty: number;
}

type Problem = {
    id: number;
    text: string;
    tags: Tag[];
    image: string;
    imageName: string;
}

const AdminPanel = () => {
  // Tags state
  const [tags, setTags] = useState([] as Tag[]);
  const [newTagName, setNewTagName] = useState('');
  const [newTagDifficulty, setNewTagDifficulty] = useState(1);

  // Problems state
  const [problems, setProblems] = useState([] as Problem[]);
  const [newProblemText, setNewProblemText] = useState('');
  const [selectedTags, setSelectedTags] = useState([] as number[]);
  const [imagePreview, setImagePreview] = useState('');
  const [imageName, setImageName] = useState('');

  // Handle tag creation
  const handleCreateTag = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (newTagName.trim()) {
      const newTag = {
        id: Date.now(),
        name: newTagName.trim(),
        difficulty: newTagDifficulty
      };
      setTags([...tags, newTag]);
      setNewTagName('');
      setNewTagDifficulty(1);
    }
  };

  // Handle problem creation
  const handleCreateProblem = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (newProblemText.trim() && selectedTags.length > 0) {
      const newProblem = {
        id: Date.now(),
        text: newProblemText.trim(),
        tags: selectedTags.map(tagId => tags.find(tag => tag.id === tagId)).filter((tag: Tag | undefined) => tag) as Tag[],
        image: imagePreview,
        imageName: imageName
      };
      setProblems([...problems, newProblem]);
      setNewProblemText('');
      setSelectedTags([]);
      setImagePreview('');
      setImageName('');
    }
  };

  // Handle image upload
  const handleImageUpload = (e: { target: { files: any[]; }; }) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        if(!e.target) return;
        setImagePreview(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle tag selection
  const toggleTagSelection = (tagId: any) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  // Delete tag
  const deleteTag = (tagId: any) => {
    setTags(tags.filter(tag => tag.id !== tagId));
    setSelectedTags(selectedTags.filter(id => id !== tagId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Админ Панель</h1>
          <p className="text-gray-600">Управление тегами и задачами</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tags Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-xl mr-4">
                <Tag className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Создание Тегов</h2>
                <p className="text-gray-600">Добавьте новые категории для задач</p>
              </div>
            </div>

            <form onSubmit={handleCreateTag} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название тега
                </label>
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Например: Алгоритмы, Математика..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Сложность <span className="text-gray-500">(1-10)</span>
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newTagDifficulty}
                    onChange={(e) => setNewTagDifficulty(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-lg font-bold text-blue-600 w-8">
                    {newTagDifficulty}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                <span>Создать Тег</span>
              </button>
            </form>

            {/* Existing Tags */}
            {tags.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Существующие теги</h3>
                <div className="space-y-3">
                  {tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Tag className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-800">{tag.name}</span>
                          <div className="flex items-center space-x-1 mt-1">
                            <Zap className="w-3 h-3 text-yellow-500" />
                            <span className="text-sm text-gray-600">{tag.difficulty}/10</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteTag(tag.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Problems Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-xl mr-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Создание Задач</h2>
                <p className="text-gray-600">Добавьте новую задачу с тегами и изображением</p>
              </div>
            </div>

            <form onSubmit={handleCreateProblem} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Текст задачи
                </label>
                <textarea
                  value={newProblemText}
                  onChange={(e) => setNewProblemText(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 min-h-[120px] resize-none"
                  placeholder="Введите полное описание задачи..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Выберите теги
                </label>
                {tags.length === 0 ? (
                  <div className="text-gray-500 text-sm p-4 bg-gray-50 rounded-xl text-center">
                    Сначала создайте теги
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-2 bg-gray-50 rounded-xl border border-gray-200">
                    {tags.map((tag) => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTagSelection(tag.id)}
                        className={`flex items-center space-x-2 p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedTags.includes(tag.id)
                            ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                            : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <Tag className="w-3 h-3" />
                        <span>{tag.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Прикрепить изображение
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      {imageName || 'Нажмите для загрузки или перетащите файл'}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-xl border border-gray-200"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={tags.length === 0 || selectedTags.length === 0}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
                <span>Создать Задачу</span>
              </button>
            </form>

            {/* Existing Problems */}
            {problems.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Созданные задачи</h3>
                <div className="space-y-4">
                  {problems.slice(0, 3).map((problem) => (
                    <div
                      key={problem.id}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <p className="text-gray-800 mb-3 line-clamp-2">{problem.text}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {problem.tags.map((tag: Tag) => (
                          <span
                            key={tag.id}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                      {problem.image && (
                        <div className="w-16 h-16">
                          <img
                            src={problem.image}
                            alt="Problem"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;
