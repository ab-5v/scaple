/**
 * Simple history of changes component
 */
Scaple.History = {

    /**
     * States store
     * @private
     * @param Array
     */
    store: [],

    /**
     * Function, called on history state save
     * should return current state
     * @private
     * @type Object
     */
    onpush: function() {},


    /**
     * Function, called on history state restore
     * with restored state as argument
     * @private
     * @param {Object} state
     * @type Object
     */
    onpop: function() {},

    /**
     * Init
     * @param {Object} options
     * @param {Function} options.onpush
     * @param {Function} options.onpop
     */
    init: function(options) {
        this.onpush = options.onpush;
        this.onpop = options.onpop;
    },

    /**
     * Save current state
     */
    push: function() {
        this.store.push( this.onpush() );
    },

    /**
     * Restore last previous
     */
    pop: function() {
        if (this.store.length) {
            this.onpop( this.store.pop() );
        }
    }
};
