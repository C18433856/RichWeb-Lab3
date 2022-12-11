# 1

## Explain what is meant by the stream abstraction. What is the relationship between streams and the observer pattern? What are streams useful for modeling and when might you use them in Rich Web development?

A data stream involves processing a resource a chunk at a time, and can function without regard to the final size of the resource, and without being constricted by the arrival time of the resource.

A stream implements the observer pattern by allowing one or multiple observers to be notified when a stream-related event occurs, via the use of subscriptions. The observers may then respond to the event that just happened in an appropriate way.

As stream can be created over any resource, streams can be used all throught an application, and it allows the arhitecture of the application to only have to address stream processing problems on various configurations of streams. For example, by implementing streams in this way, the same logical structure and semantics that are used for reacting to mouse clicks, can be used to react to DOM changes, network responses, etc. Streams are used in Rich Web to implement asynchronous functionality, and they can handle data coming from several remote locations at the same time, whereas promises are not suited for this scenario.


# 2

## Assume that you are building an interface to an API in your Rich Web App. Describe in detail how you could use the RxJS library to handle asynchronous network responses to API requests. In your opinion, what are the benefits to using a streams library for networking over, say, promises? And what do you think are the downsides?

Supposing that someone is building a web application which uses the fetch() function from the Javascript fetch API, RxJS provides a fromFetch() function which is used to create an observable. This observable performs an HTTP request via fetch when subscribed to. The subscriber can choose how it wants to handle a response from the request, and can functionality for when the request is complited can also be codded in for the subscriber. 

The RxJS can be used to perform operations similar to Array Operations, such as filtering the data from the incoming request. This is done with functions called within a pipe() function, that handles all non-creation operators.

There are benefits to using the streams library for networking over using promises. One of those advantages is the ability of observers to simply unsubsribe from an observable, where as there is no way to cancel the operation started by a promise. A promise will always either succeed or fail. Another benefit of streams is allowing multiple entities to subscribe to an observable, where as promises can only handle on event at the time.

There are however certain disadvantages as well. The RxJS library is well known for being difficult to use, so overall program complexity is increased in applications using it. This is not a disadvantage from a functionality or performance standpoint, but it is very easy to misuse the library, and memory leaks can easily occur, such as when forgeting to unsubscribe from a subject before the subscribing entity is destroyed. Misusing the library can also lead to bugs that are difficult to solve, as testing and debuging is already difficult when using RxJS. Lastly, RxJS is an external library where as promises are native to Javscript. This introduces a small performance overhead.

# 3

## Consider three asynchronous tasks, A,B & C. What are the consequences of these functions sharing global state? What is a good practice to alleviate any problems associated with this?

The problem with this configuration is the fact that it is unknown in which order the tasks A, B and C will affect the variables. This will cause uncertainty about the values of variables as a tasks starts working with it.

Data only inteded to be used by one task may be updated by other task. This may be unintented by the programmer, but can happen if the naming of the data used by the tasks is similar. This should not be a possibility in the first placec.

There is also the issue that these asynchronous tasks may be in progress at the same time. If one tasks reads the value of a variable and does an operation with it, and then updates it, and another tasks updated the variable while the first tasks was still performing the operation, the update made by the second task will be entirely lost when the first tasks finishes and updates the variable as well.

In order to alleviate these problems, tasks should use variables that are local to them and only they can access. If the same data must be accessed by several functions, it should not be directly available, but it should be encapsulated and provided via an interface using mutators and setters which can decide how the data can be used.

