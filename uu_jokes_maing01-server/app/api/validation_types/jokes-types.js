
const jokeCreateDtoInType = shape({
  name: string().isRequired(),
  text: string(),
  visibility: boolean()
});

const jokeGetDtoInType = shape({
  id: id()
});

const jokeSetActiveDtoInType = shape({
  id: id().isRequired()
});

const jokeListDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});

const jokeUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string().isRequired(),
  text: string()
});
