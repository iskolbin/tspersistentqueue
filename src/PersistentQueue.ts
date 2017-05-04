type List<T> = null | { _0: T, _1: List<T>}

export class PersistentQueue<T> {
	protected _length = 0
	protected _queue: List<T> = null
	protected _stack: List<T> = null

	get length() {
		return this._length
	}

	constructor( arraylike?: T[] ) {
		if ( arraylike !== undefined ) {
			let queue = null
			for ( let i = arraylike.length - 1; i >= 0; i-- ) {
				queue = { _0: arraylike[i], _1: queue }
			}
			this._queue = queue
			this._length = arraylike.length
		}	
	}

	clear() {
		return new PersistentQueue<T>()
	}

	enqueue( v: T ): PersistentQueue<T> {
		const newQueue = new PersistentQueue<T>()
		newQueue._length = this._length + 1
		if ( !this._queue ) {
			newQueue._queue = { _0: v, _1: null }
			newQueue._stack = this._stack
		} else {
			newQueue._queue = this._queue
			newQueue._stack = { _0: v, _1: this._stack }
		}
		return newQueue
	}

	dequeue(): PersistentQueue<T> {
		if ( this._length === 0 ) {
			return this
		} else {
			const newQueue = new PersistentQueue<T>()
			newQueue._length = this._length - 1
			if ( !this._queue || !this._queue._1 ) {
				let reversedStack: List<T> = null
				for ( let stack = this._stack; !!stack; stack = stack._1 ) {
					reversedStack = { _0: stack._0, _1: reversedStack }
				}
				newQueue._queue = reversedStack
				newQueue._stack = null
			} else {
				newQueue._queue = this._queue._1
				newQueue._stack = this._stack
			}
			return newQueue
		}
	}

	peek(): undefined | T {
		if ( !!this._queue ) {
			return this._queue._0
		}
	}

	toArray(): T[] {
		const array = []
		for ( let q = this._queue; !!q; q = q._1 ) {
			array.push( q._0 )
		}
		const stack = []
		for ( let s = this._stack; !!s; s = s._1 ) {
			stack.push( s._0 )
		}
		for ( let i = 0, len = stack.length; i < len; i++ ) {
			array.push( stack[len - i - 1] )
		}
		return array
	}

	toString(): String {
		return `PersistentQueue [${this.toArray().map( v => v.toString() ).join( ", " )}]`
	}
}
