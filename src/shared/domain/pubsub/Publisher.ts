import { TopicTrigger } from '../../infraestructure/gcp-pubsub/TopicTrigger'

export interface Publisher {
    /**
    * @param topic Existent topic
    * @param object Javascript Object to encode
    */
    publishJSON(topic: TopicTrigger, object: any): Promise<void>
    /**
    * @param topic Existent topic
    * @param message Plain text to encode
    */
    publishPlainMessage(topic: TopicTrigger, message: any): Promise<void>
}