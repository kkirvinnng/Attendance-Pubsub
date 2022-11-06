import { PubSub } from '@google-cloud/pubsub'
import { injectable } from 'inversify'
import { Publisher } from '../../domain/pubsub/Publisher'
import { TopicTrigger } from './TopicTrigger'

@injectable()
export class GCPPubSub implements Publisher {

    private _pubsub: PubSub

    constructor() {

        this._pubsub = new PubSub({ projectId: process.env.FB_PROJECT_ID })
    }

    /**
     * @param topic Existent topic
     * @param object Javascript Object to encode
     */
    async publishJSON(topic: TopicTrigger, object: any) {
        const pubTopic = this._pubsub.topic(topic)

        await pubTopic.publishMessage({ json: object })
    }

    /**
     * @param topic Existent topic
     * @param message Plain text to encode
     */
    async publishPlainMessage(topic: TopicTrigger, message: any) {
        const pubTopic = this._pubsub.topic(topic)

        const encoded = Buffer.from(message, 'utf-8')

        await pubTopic.publishMessage({ data: encoded })
    }

}