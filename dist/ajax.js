'use strict';

(function () {
    'use strict';

    window.Promise = Promise;

    /**
     * Promise Object
     * @param {Function} startFunction
     * @constructor
     */
    function Promise(startFunction) {
        this.startFunction = startFunction;

        this.startFunction.call(this.startFunction, resolver.bind(this), rejecter.bind(this));
    }
    Promise.prototype = {
        then: function then(nextStep, catcher) {
            this.nextStep = nextStep;
            this.catcher = catcher;
            return this;
        },

        catch: function _catch(catcher) {
            this.catcher = catcher;
            return this;
        }
    };

    /**
     * Call the .then
     */
    function resolver() {
        if (typeof this.nextStep === 'function') {
            this.nextStep.apply(this.startFunction, arguments);
        }
    }

    /**
     * Call the .catch
     */
    function rejecter() {
        if (typeof this.catcher === 'function') {
            this.catcher.apply(this.startFunction, arguments);
        }
    }
})();
'use strict';

(function () {
    'use strict';

    window.Ajax = {
        get: get,
        post: post,
        method: method
    };

    /**
     * Ajax get call
     * @param url
     * @returns {Window.Promise|*}
     */
    function get(url) {
        return this.method('GET', url);
    }

    /**
     * Ajax post call
     * @param url
     * @param data
     * @returns {Window.Promise|*}
     */
    function post(url, data) {
        return this.method('POST', url, data);
    }

    /**
     * Do an ajax call
     * @param type
     * @param url
     * @param data
     * @returns {Promise}
     */
    function method(type, url, data) {
        return new Promise(methodPromise);

        /**
         * Promise for Ajax method
         * @param {Function} resolve
         * @param {Function} reject
         */
        function methodPromise(resolve, reject) {
            var request = new XMLHttpRequest();

            data = JSON.stringify(data);

            request.open(type, getAjaxUrl(url), true);
            request.onreadystatechange = onReadyStateChange;
            request.setRequestHeader('Content-type', 'application/json');
            request.send(data);

            /**
             * When the ready state changes
             */
            function onReadyStateChange() {
                if (request.readyState === 4) {
                    try {
                        if (request.status === 200) {
                            resolve(JSON.parse(request.responseText));
                        } else {
                            reject(JSON.parse(request.responseText));
                        }
                    } catch (ex) {
                        reject(request.status);
                    }
                }
            }
        }
    }

    function getAjaxUrl(url) {
        if (typeof use === 'function') {
            if (use('API_URL')) {
                return use('API_URL').replace('{action}', url);
            }
        }

        return url;
    }
})();