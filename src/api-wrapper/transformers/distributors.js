const DistributorsTransformer = {
  fromAPIModel(apiModel) {
    return apiModel.map(distributor => {
      return {
        name: distributor.name[0].value,
        distributorId: distributor.tid[0].value,
      }
    });
  },
};

export default DistributorsTransformer;
