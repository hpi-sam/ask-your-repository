import elijaApi from './ElijaAPI';

export default {
  find(searchTerm) {
    return elijaApi().get('/artefacts/image', {
      search: searchTerm,
    });
  },
  // Usage find("Cookies", {date_range: {
  //      start_date: startDate,
  //     end_date: endDate,
  //   },},);
  listAll() {
    return elijaApi().get('/artefacts/image');
  },
  create(id, tags, fileUrl) {
    return elijaApi().post('/artefacts/image', {
      id,
      tags,
      file_url: fileUrl,
    });
  },
  update(id, tags) {
    let tagsString = '';
    tags.forEach((tag) => {
      tagsString.append(`${tag}, `);
    });
    tagsString = tagsString.substring(0, tagsString.length - 2);
    return elijaApi().put(`/artefacts/image/${id}`, {
      tags: tagsString,
    });
  },
};
