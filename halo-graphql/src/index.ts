import schema from './schema'
import { createModule } from 'graphql-modules'

import lib from 'lib'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

let _autocode

const getAutocode = ({ HALO_AUTOCODE_TOKEN, haloAutoCode }: { HALO_AUTOCODE_TOKEN?: string, haloAutoCode?: any}) => {
  if (haloAutoCode) {
    return haloAutoCode
  }
  if (_autocode) {
    return _autocode
  }

  const _lib = lib({
    token: HALO_AUTOCODE_TOKEN
  })

  _autocode = _lib.halo.infinite['@0.3.9']
  return _autocode
}

// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const HaloGraphQL = createModule({
  id: 'halo-graphql',
  typeDefs: [schema],
  dirname: __dirname,
  resolvers: {
    Query: {
      async appearance (root, args, context) {
        return await getAutocode(context).appearance(args)
      },
      async articles (root, args, context) {
        return await getAutocode(context).articles.list({ language: args.language?.replace('_', '-') })
      },
      async competitiveSkillRank (root, args, context) {
        return await getAutocode(context).stats.csrs(args)
      },
      async medals (root, args, context) {
        return await (getAutocode(context).metadata.medals.list()).data
      },
      async matches (root, args, context) {
        return await getAutocode(context).stats.matches.list(args)
      },
      async match (root, args, context) {
        return (await getAutocode(context).stats.matches.retrieve(args)).data
      },
      async userGeneratedContent (root, args, context) {
        return await getAutocode(context).ugc.search(args)
      },
      async multiplayerServiceRecord (root, args, context) {
        return await getAutocode(context).stats['service-record'].multiplayer({
          ...args,
          filter: args.filter?.replace('_', ':')
        })
      },
      async campaignServiceRecord (root, args, context) {
        return await getAutocode(context).stats['service-record'].campaign(args)
      }
    }
  }
})

export default HaloGraphQL
