# 1

## Explain what is meant by the stream abstraction. What is the relationship between streams and the observer pattern? What are streams useful for modeling and when might you use them in Rich Web development?

A data stream involves processing a resource a chunk at a time, and can function without regard to the final size of the resource, and without being constricted by the arrival time of the resource.

A stream implements the observer pattern by allowing one or multiple observers to be notified when a stream-related event occurs, via the use of subscriptions. The observers may then respond to the event that just happened in an appropriate way.

As stream can be created over any resource, streams can be used all throught an application, and it allows the arhitecture of the application to only have to address stream processing problems on various configurations of streams. For example, by implementing streams in this way, the same logical structure and semantics that are used for reacting to mouse clicks, can be used to react to DOM changes, network responses, etc. Streams are used in Rich Web to implement asynchronous functionality, and they can handle data coming from several remote locations at the same time, whereas promises are not suited for this scenario.


# 2

## Assume that you are building an interface to an API in your Rich Web App. Describe in detail how you could use the RxJS library to handle asynchronous network responses to API requests. In your opinion, what are the benefits to using a streams library for networking over, say, promises? And what do you think are the downsides?

# 3

## Consider three asynchronous tasks, A,B & C. What are the consequences of these functions sharing global state? What is a good practice to alleviate any problems associated with this?