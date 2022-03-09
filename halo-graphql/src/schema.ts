import { gql } from 'graphql-modules'

export default gql`
    enum CacheControlScope {
        PUBLIC
        PRIVATE
    }

    directive @cacheControl(
        maxAge: Int
        scope: CacheControlScope
        inheritMaxAge: Boolean
    ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
    
    type Additional {
        author: String
        filter: String
        gamertag: String
        kind: String
        language: Language
        mode: String
        tags: [String]
    }

    type AllTime {
        initial_measurement_matches: Float
        measurement_matches_remaining: Float
        next_sub_tier: Float
        next_tier: String
        next_tier_start: Float
        sub_tier: Float
        tier: String
        tier_image_url: String
        tier_start: Float
        value: Float
    }

    type Appearance {
        backdrop_image_url: String
        emblem_url: String
        service_tag: String
    }

    type AppearanceResponse {
        additional: Additional
        data: Appearance
    }

    type Article {
        image_url: String
        message: String
        subtitle: String
        title: String
    }

    type ArticlesResponse {
        additional: Additional
        count: Float
        data: [Article]
    }

    type Asset {
        id: ID
        thumbnail_url: String
        version: String
    }

    enum AssetKind {
        UgcGameVariant
        Map
    }

    type Assists {
        callouts: Float
        driver: Float
        emp: Float
    }

    type AudioLogs {
        banished: Float
        spartans: Float
        unsc: Float
    }

    type AutogeneratedMainType {
        additional: Additional
        count: Float
        data: [Data]
    }

    type Breakdowns {
        assists: Assists
        kills: Kills
        matches: Matches
        medals: [Medals]
    }

    type CampaignServiceRecord {
        audio_logs: AudioLogs
        difficulty: Difficulty
        fob_secured: Float
        mission_completed: Float
        propaganda_towers_destroyed: Float
        skulls: Float
        spartan_cores: Float
    }

    type CampaignServiceRecordResponse {
        additional: Additional
        data: CampaignServiceRecord
    }

    type Category {
        asset: Asset
        name: String
    }

    type Core {
        breakdowns: Breakdowns
        damage: Damage
        kda: Float
        kdr: Float
        points: Float
        rounds: Rounds
        score: Float
        shots: Shots
        summary: Summary
        total_score: Float
    }

    type Csr {
        post_match: PostMatch
        pre_match: PreMatch
    }

    type CSR {
        input: String
        queue: String
        response: Response
    }

    type CSRResponse {
        additional: Additional
        data: [CSR!]!
    }

    type Current {
        initial_measurement_matches: Float
        measurement_matches_remaining: Float
        next_sub_tier: Float
        next_tier: String
        next_tier_start: Float
        sub_tier: Float
        tier: String
        tier_image_url: String
        tier_start: Float
        value: Float
    }

    type Damage {
        average: Float
        dealt: Float
        taken: Float
    }

    type Data {
        details: Details
        duration: Duration
        experience: String
        id: ID
        played_at: String
        players: [Players]
        teams: Teams
    }

    type Details {
        category: Category
        map: Map
        outcome: String
        playlist: Playlist
        rank: Float
        stats: Stats
        team: Team
    }

    type Difficulty {
        highest_completed: String
        highest_completed_image_url: String
        laso_completed: Boolean
    }

    type Duration {
        human: String
        seconds: Float
    }

    type ImageUrls {
        large: String
        medium: String
        small: String
    }

    type Kills {
        grenades: Float
        headshots: Float
        melee: Float
        power_weapons: Float
    }

    enum Language {
        de_DE
        es_ES
        es_MX
        en_US
        fr_FR
        it_IT
        ja_JP
        ko_KR
        pl_PL
        pt_BR
        ru_RU
        zh_CN
        zh_HK
    }

    input Limit {
        count: Float
        offset: Float
    }

    type Map {
        asset: Asset
        name: String
    }

    type Match {
        details: Details
        duration: Duration
        experience: String
        id: ID
        played_at: String
        player: Player
        teams: Teams
    }

    type Matches {
        draws: Float
        left: Float
        losses: Float
        wins: Float
    }

    enum MatchMode {
        custom
        matchmade
    }

    type MatchResponse {
        additional: Additional
        count: Float
        data: [Match!]!
        paging: Paging
    }

    type Medal {
        description: String
        difficulty: String
        id: ID
        image_urls: ImageUrls
        name: String
    }

    type Medals {
        count: Float
        id: ID
        image_urls: ImageUrls
        name: String
    }

    enum MultiplayerFilter {
        matchmade_pvp
        matchmade_social
        matchmade_ranked
        matchmade_bots
        custom
    }

    type MultiplayerServiceRecord {
        core: Core
        matches_played: Float
        time_played: TimePlayed
        win_rate: Float
    }

    type MultiplayerServiceRecordResponse {
        additional: Additional
        data: MultiplayerServiceRecord
    }

    type Paging {
        count: Float
        offset: Float
    }

    type Participation {
        joined_at: String
        joined_in_progress: Boolean
        left_at: String
        presence: Presence
    }

    type Player {
        outcome: String
        participation: Participation
        progression: Progression
        rank: Float
        stats: Stats
        team: Team
    }

    type Players {
        gamertag: String
        outcome: String
        participation: Participation
        progression: Progression
        rank: Float
        stats: Stats
        team: Team
        type: String
    }

    type Playlist {
        asset: Asset
        name: String
        properties: Properties
    }

    type Plays {
        recent: Float
        total: Float
    }

    type PostMatch {
        sub_tier: Float
        tier: String
        tier_image_url: String
        tier_start: Float
        value: Float
    }

    type PreMatch {
        sub_tier: Float
        tier: String
        tier_image_url: String
        tier_start: Float
        value: Float
    }

    type Presence {
        beginning: Boolean
        completion: Boolean
    }

    type Progression {
        csr: Csr
    }

    type Properties {
        input: String
        queue: String
        ranked: Boolean
    }

    type Query {
        appearance(gamertag: String!): AppearanceResponse
        articles(language: Language): ArticlesResponse
        campaignServiceRecord(gamertag: String!): CampaignServiceRecordResponse
        competitiveSkillRank(gamertag: String!, season: Float, version: Float): CSRResponse
        match(id: ID!): Match
        matches(gamertag: String!, limit: Limit, mode: MatchMode): MatchResponse
        medals: [Medal]
        multiplayerServiceRecord(filter: MultiplayerFilter, gamertag: String!): MultiplayerServiceRecordResponse
        userGeneratedContent(author: String, kind: AssetKind, limit: Limit, tags: [String!]): UserGeneratedContentResponse
    }

    type Response {
        all_time: AllTime
        current: Current
        season: Season
    }

    type Rounds {
        lost: Float
        tied: Float
        won: Float
    }

    type Season {
        initial_measurement_matches: Float
        measurement_matches_remaining: Float
        next_sub_tier: Float
        next_tier: String
        next_tier_start: Float
        sub_tier: Float
        tier: String
        tier_image_url: String
        tier_start: Float
        value: Float
    }

    type Shots {
        accuracy: Float
        fired: Float
        landed: Float
        missed: Float
    }

    type Skill {
        mmr: Float
    }

    type Stats {
        bookmarks: Float
        core: Core
        likes: Float
        plays: Plays
        rating: Float
    }

    type Summary {
        assists: Float
        betrayals: Float
        deaths: Float
        kills: Float
        medals: Float
        suicides: Float
        vehicles: Vehicles
    }

    type Team {
        emblem_url: String
        id: ID
        name: String
        skill: Skill
    }

    type Teams {
        details: [Details]
        enabled: Boolean
        scoring: Boolean
    }

    type TimePlayed {
        human: String
        seconds: Float
    }

    type UserGeneratedContent {
        created_at: String
        description: String
        id: ID
        modified_at: String
        name: String
        published_at: String
        references: [String]
        stats: Stats
        tags: [String]
        thumbnail_url: String
        type: String
        version: String
    }

    type UserGeneratedContentResponse {
        additional: Additional
        count: Float
        data: [UserGeneratedContent]
        paging: Paging
    }

    type Vehicles {
        destroys: Float
        hijacks: Float
    }
`
