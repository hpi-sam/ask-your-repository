import elijaApi from './ElijaAPI';
import logger from '../logger';

export default {
  find(searchTerm, offset, limit) {
    logger.info(`looking for ${searchTerm}`);
    return elijaApi.get('/artefacts', {
      params: { search: searchTerm, offset, limit },
    });
  },
  listAll(offset, limit) {
    logger.info('requesting all artefacts');
    return elijaApi.get('/artefacts', {
      params: { offset, limit },
    });
  },
  create(id, tags, fileUrl) {
    return elijaApi.post('/artefacts', {
      type: 'image',
      id,
      tags,
      file_url: fileUrl,
    });
  },
  update(id, tags) {
    return elijaApi.put(`/artefacts/${id}`, {
      tags,
    });
  },
};
