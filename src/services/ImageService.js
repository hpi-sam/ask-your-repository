import elijaApi from './ElijaAPI';

export default {
  find(searchTerm, offset, limit) {
    return elijaApi().get('/artefacts', {
      search: searchTerm,
      offset,
      limit,
    });
  },
  // Usage find("Cookies", {date_range: {
  //      start_date: startDate,
  //     end_date: endDate,
  //   },},);
  listAll(offset, limit) {
    return elijaApi().get('/artefacts', { offset, limit });
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
