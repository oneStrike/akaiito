export default {
  key: 'a9f24650-7b1c-4172-9ff7-bab4a525e590',
  exclude: [35250369],
  typingsPath: 'src/apis/types',
  apiPath: 'src/apis/',
  field: 'data',
  headerField: 'headers',
  http: {
    handler: 'httpHandler',
    import: "import { httpHandler } from '@/utils/request';",
  },
}
