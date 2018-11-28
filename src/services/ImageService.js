import elijaApi from './ElijaAPI';
import logger from '../logger';

export default {
  find(searchTerm) {
    logger.info(`looking for ${searchTerm}`);
    return elijaApi().get('/artefacts', {
      params: { search: searchTerm },
    });
  },
  // Usage find("Cookies", {date_range: {
  //      start_date: startDate,
  //     end_date: endDate,
  //   },},);
  listAll() {
    logger.info('requesting all artefacts');
    return elijaApi().get('/artefacts');
  },
  create(id, tags, fileUrl) {
    return elijaApi().post('/artefacts', {
      type: 'image',
      id,
      tags,
      file_url: fileUrl,
    });
  },
  update(id, tags) {
    return elijaApi().put(`/artefacts/${id}`, {
      tags,
    });
  },
};
