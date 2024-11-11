/**
 * 
 * @param {Object}               schema
 * @param {Boolean}             [schema.delete]
 * @param {Object}              [schema.no]
 * @param {HTMLSourceElement}   [schema.no.text]
 * @param {Function}            [schema.no.clbk]
 * @param {Object}              [schema.yes]
 * @param {HTMLSourceElement}   [schema.yes.text]
 * @param {Function}            [schema.yes.clbk]
 */
function Confirm( schema ) {

    /**
     * 
     * @property
     * @private
     */
    this._confirmElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._yesElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._noElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._yesClbk = null;

    /**
     * 
     * @property
     * @private
     */
    this._noClbk = null;

    /**
     * 
     * @property
     * @private
     */
    this._handleYes = this._evt_click_yesElem.bind( this );

    /**
     * 
     * @property
     * @private
     */
    this._handleNo = this._evt_click_noElem.bind( this );

    /**
     * 
     * @property
     * @private
     */
    this._handleKeydown = this._evt_keydown.bind( this );




    var yesText = 'OK';
    var noText = 'Άκυρο';

    if ( schema.hasOwnProperty( 'no' ) ) {

        if ( schema.no.hasOwnProperty( 'text' ) ) {

            noText = schema.no.text;

        }

        if ( schema.no.hasOwnProperty( 'clbk' ) ) {

            this._noClbk = schema.no.clbk;

        }

    }

    if ( schema.hasOwnProperty( 'yes' ) ) {

        if ( schema.yes.hasOwnProperty( 'text' ) ) {

            yesText = schema.yes.text;

        }

        if ( schema.yes.hasOwnProperty( 'clbk' ) ) {

            this._yesClbk = schema.yes.clbk;

        }

    }

    var fragment = document.createDocumentFragment();

    this._confirmElem = document.createElement( 'confirm-mod' );
    fragment.appendChild( this._confirmElem );

    if ( schema.hasOwnProperty( 'delete' ) === true && schema[ 'delete' ] === true ) {

        this._confirmElem.classList.add( 'delete' );

    }

    var contentElem = document.createElement( 'DIV' );
    contentElem.classList.add( 'content' );
    this._confirmElem.appendChild( contentElem );

    var contentPElem = document.createElement( 'P' );
    contentPElem.classList.add( 'text' );
    contentPElem.textContent = schema.text;
    contentElem.appendChild( contentPElem );

    var buttonsElem = document.createElement( 'DIV' );
    buttonsElem.classList.add( 'buttons' );
    contentElem.appendChild( buttonsElem );

    if ( schema.hasOwnProperty( 'no' ) ) {

        this._noElem = document.createElement( 'BUTTON' );
        this._noElem.classList.add( 'deny', 'button' );
        this._noElem.innerHTML = noText;
        buttonsElem.appendChild( this._noElem );

        this._noElem.addEventListener( 'click', this._handleNo );

    }

    this._yesElem = document.createElement( 'BUTTON' );
    this._yesElem.classList.add( 'main', 'button' );
    this._yesElem.innerHTML = yesText;
    buttonsElem.appendChild( this._yesElem );

    this._yesElem.addEventListener( 'click', this._handleYes );
    document.body.addEventListener( 'keydown', this._handleKeydown );

    document.body.appendChild( fragment );

};

/**
 * 
 */
Confirm.prototype.destroy = function() {

    document.body.removeEventListener( 'keydown', this._handleKeydown );    
    this._yesElem.removeEventListener( 'click', this._handleYes );    
    this._yesElem = null;

    if ( this._noElem !== null ) {

        this._noElem.removeEventListener( 'click', this._handleNo );
        this._noElem = null;

    }

    while ( this._confirmElem.firstChild ) {

        this._confirmElem.firstChild.remove();

    }

    this._confirmElem.remove();
    this._confirmElem = null;

};




/**
 * 
 * @private
 */
Confirm.prototype._evt_click_yesElem = function() {

    this.destroy();

    if ( this._yesClbk !== null ) {

        this._yesClbk();

    }

};

/**
 * 
 * @private
 */
Confirm.prototype._evt_click_noElem = function() {

    this.destroy();

    if ( this._noClbk !== null ) {

        this._noClbk();

    }

};

/**
 * 
 * @private
 * @param {Event} evt 
 */
Confirm.prototype._evt_keydown = function( evt ) {

    if ( evt.key === 'Enter' ) {

        evt.preventDefault();

        this._evt_click_yesElem();

    } else if ( evt.key === 'Escape' ) {

        evt.preventDefault();

        this._evt_click_noElem();

    }

};