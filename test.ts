import { PersistentQueue } from "./src/PersistentQueue"
import { suite, test } from "mocha-typescript"
import { assert, deepEqual } from "assert"

@suite class PersistentQueueTestSute {
	@test("constructor without args returns empty queue")
	ConstructorNoArgs() {
		deepEqual( new PersistentQueue().length, 0 )
	}

	@test("constructor accepts array-like as argument")
	ConstructorArg() {
		deepEqual( new PersistentQueue( [1,2,3,4] ).length, 4 )
		deepEqual( new PersistentQueue( [1,2,3,4] ).toArray(), new PersistentQueue().enqueue(1).enqueue(2).enqueue(3).enqueue(4).toArray() )
	}

	@test("clearing empty queue does nothing")
	ClearingEmpty() {
		deepEqual( new PersistentQueue().clear().length, 0 )
	}

	@test("enqueue 1 element and dequeue it")
	Enqueue1Dequeue() {
		deepEqual( new PersistentQueue().enqueue( 1 ).peek(), 1 )
		deepEqual( new PersistentQueue().enqueue( 1 ).length, 1 )
		deepEqual( new PersistentQueue().enqueue( 1 ).dequeue().length, 0 )
	}
	
	@test("enqueue 2 element and dequeue them")
	Enqueue2Dequeue() {
		deepEqual( new PersistentQueue().enqueue( 1 ).enqueue( 2 ).peek(), 1 )
		deepEqual( new PersistentQueue().enqueue( 1 ).enqueue( 2 ).length, 2 )
		deepEqual( new PersistentQueue().enqueue( 1 ).enqueue( 2 ).dequeue().length, 1 )
		deepEqual( new PersistentQueue().enqueue( 1 ).enqueue( 2 ).dequeue().peek(), 2 )
		deepEqual( new PersistentQueue().enqueue( 1 ).enqueue( 2 ).dequeue().dequeue().length, 0 )
		deepEqual( new PersistentQueue( [1, 2] ).dequeue().peek(), 2 )
		deepEqual( new PersistentQueue( [1] ).enqueue(2).dequeue().dequeue().peek(), undefined )
		deepEqual( new PersistentQueue( [1,2] ).enqueue( 3 ).enqueue( 4 ).enqueue( 5 ).dequeue().dequeue().dequeue().dequeue().dequeue().peek(), undefined )
	}
	
	@test("enqueue 2 element, dequeue, enqueue, 2x dequeue")
	Enqueue2DequeueE2D() {
		deepEqual( new PersistentQueue().enqueue( 1 ).enqueue( 2 ).dequeue().enqueue( 3 ).length, 2 )
		deepEqual( new PersistentQueue().enqueue( 1 ).enqueue( 2 ).dequeue().enqueue( 3 ).dequeue().length, 1 )
		deepEqual( new PersistentQueue().enqueue( 1 ).enqueue( 2 ).dequeue().enqueue( 3 ).dequeue().dequeue().length, 0 )
		deepEqual( new PersistentQueue().enqueue( 1 ).enqueue( 2 ).dequeue().enqueue( 3 ).peek(), 2 )
		deepEqual( new PersistentQueue().enqueue( 1 ).enqueue( 2 ).dequeue().enqueue( 3 ).dequeue().peek(), 3 )
	}

	@test("dequeue from empty queue yields same queue")
	DequeueEmpty() {
		let a = new PersistentQueue()
		let b = new PersistentQueue().enqueue( 1 ).clear()
		let c = new PersistentQueue().enqueue( 1 ).dequeue()
		deepEqual( a.dequeue() === a, true )
		deepEqual( b.dequeue() === b, true )
		deepEqual( c.dequeue() === c, true )
	}

	@test("peeking from empty queue yields undefined")
	PeekEmpty() {
		let a = new PersistentQueue()
		let b = new PersistentQueue().enqueue( 1 ).clear()
		let c = new PersistentQueue().enqueue( 1 ).dequeue()
		deepEqual( a.peek() === undefined, true )
		deepEqual( b.peek() === undefined, true )
		deepEqual( c.peek() === undefined, true )
	}

	@test("length property holds items count")
	Length() {
		deepEqual( new PersistentQueue().enqueue( 1 ).dequeue().enqueue( 2 ).length, 1 )
		deepEqual( new PersistentQueue().enqueue( 1 ).enqueue( 2 ).dequeue().enqueue( 3 ).length, 2 )
		deepEqual( new PersistentQueue().enqueue( 1 ).enqueue( 2 ).dequeue().enqueue( 3 ).enqueue( 4 ).length, 3 )
	}

	@test("convert to array")
	ToArray() {
		deepEqual( new PersistentQueue().toArray(), [] )
		deepEqual( new PersistentQueue().enqueue( 1 ).enqueue( 2 ).enqueue( 3 ).toArray(), [1, 2, 3] )
	}

	@test("convert to string")
	ToString() {
		deepEqual( new PersistentQueue().toString(), "PersistentQueue []" )
		deepEqual( new PersistentQueue([1,2,3]).toString(), "PersistentQueue [1, 2, 3]")
	}
}
