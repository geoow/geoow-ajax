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
    function get (url)
    {
        return this.method('GET', url);
    }

    /**
     * Ajax post call
     * @param url
     * @param data
     * @returns {Window.Promise|*}
     */
    function post (url, data)
    {
        return this.method('POST', url, data);
    }

    /**
     * Do an ajax call
     * @param type
     * @param url
     * @param data
     * @returns {Promise}
     */
    function method (type, url, data)
    {
        return new Promise(methodPromise);

        /**
         * Promise for Ajax method
         * @param {Function} resolve
         * @param {Function} reject
         */
        function methodPromise (resolve, reject)
        {
            let request = new XMLHttpRequest();

            data = JSON.stringify(data);

            request.open(type, getAjaxUrl(url), true);
            request.onreadystatechange = onReadyStateChange;
            request.setRequestHeader('Content-type', 'application/json');
            request.send(data);

            /**
             * When the ready state changes
             */
            function onReadyStateChange ()
            {
                if (request.readyState === 4) {
                    try {
                        if (request.status === 200) {
                            resolve(JSON.parse(request.responseText));
                        }
                        else {
                            reject(JSON.parse(request.responseText));
                        }
                    }
                    catch (ex) {
                        reject(request.status);
                    }
                }
            }
        }
    }

    function getAjaxUrl (url)
    {
        if (typeof use === 'function') {
            if (use('API_URL')) {
                return use('API_URL').replace('{action}', url);
            }
        }

        return url;
    }
})();