import elijaApi from './ElijaAPI';

export default {
  find(searchTerm) {
    return elijaApi().get('/artefacts', {
      search: searchTerm,
    });
  },
  // Usage find("Cookies", {date_range: {
  //      start_date: startDate,
  //     end_date: endDate,
  //   },},);
  listAll() {
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
