const TagsTransformer = {
  fromAPIModel(apiModel) {
    return apiModel.map(tag => {
      return {
        name: tag.name.length > 0 ? tag.name[0].value : null,
        tagId: tag.tid[0].value,
      }
    });
  },
};

export default TagsTransformer;
