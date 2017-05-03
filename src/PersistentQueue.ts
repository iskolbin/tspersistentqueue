type List<T> = null | { _0: T, _1: List<T>}

export class PersistentQueue<T> {
	protected _length = 0
	protected _queue: List<T> = null
	protected _stack: List<T> = null
	protected _array: null | Array<T> = null

	get length() {
		return this._length
	}

	constructor() {}

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
				if ( this._queue || !reversedStack ) {
					newQueue._queue = reversedStack
				} else {
					newQueue._queue = reversedStack._1
				}
				newQueue._stack = null
			} else {
				newQueue._queue = this._queue._1
				newQueue._stack = this._stack
			}
			return newQueue
		}
	}

	empty(): boolean {
		return this._length === 0
	}

	peek(): undefined | T {
		if ( !!this._queue ) {
			return this._queue._0
		}
	}

	toArray( cache = false ): T[] {
		if ( !this._array ) {
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
			if ( cache ) {
				this._array = array
			}
			return array
		} else {
			return this._array
		}
	}

	static fromArray<T>( array: T[] ): PersistentQueue<T> {
		const newQueue = new PersistentQueue<T>()
		let queue = null
		for ( let i = array.length - 1; i >= 0; i-- ) {
			queue = { _0: array[i], _1: queue }
		}
		newQueue._queue = queue
		newQueue._length = array.length
		return newQueue
	}
}
