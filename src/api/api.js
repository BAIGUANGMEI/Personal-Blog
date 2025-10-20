import service from './index'

export const Api = {
  // Add Bulletin
  addBulletin:async (author, content) => {
    const formData = new FormData();

    formData.append('author', author);
    formData.append('content', content);

    try{
      const response = await service.post('/bulletin/add-bulletin', formData);
      return response;
    } catch (error) {
      console.error('Error adding bulletin:', error);
      return {"message": "Error adding bulletin"};
    }
  },

  getBulletins: async () => {
    try {
      const response = await service.get('/bulletin/list');
      return response;
    } catch (error) {
      console.error('Error fetching bulletins:', error);
      return {"message": "Error fetching bulletins"};
    }
  }

}

// 导出所有API
export default {
  Api,
}