const TagsTransformer = {
  fromAPIModel(apiModel) {
    return apiModel.map(tag => {
      return {
        name: tag.name.length > 0 ? tag.name[0].value : null,
        tagId: tag.tid[0].value,
        icon: tag.field_tag_icon.length > 0 ? tag.field_tag_icon[0].value : 'ios-pricetag-outline',
      }
    });
  },
};

export default TagsTransformer;
