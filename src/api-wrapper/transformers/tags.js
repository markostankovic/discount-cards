const TagsTransformer = {
  fromAPIModel(apiModel) {
    return apiModel.map(tag => {

      // const coordinate = location.field_location.length > 0 ? {
      //   latitude: parseFloat(location.field_location[0].lat),
      //   longitude: parseFloat(location.field_location[0].lon),
      // } : null;

      return {
        name: tag.name.length > 0 ? tag.name[0].value : null,
        tagId: tag.tid[0].value,
      }
    });
  },
};

export default TagsTransformer;
