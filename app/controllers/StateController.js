"use strict";

var Controller = require('expressway').Controller;
var _ = require('lodash');

class StateController extends Controller
{
    serial(request,response,next,deviceCollection)
    {
        return _.sample(deviceCollection);
    }

    /**
     * "StateController.quote" route.
     * POST /device/quote
     * @injectable
     */
    quote(request,response,next,Device,md5)
    {
        let post = request.body;

        // Mimic the valuation web service.
        return Device.findById(post.deviceId).then(device => {
            return {
                quoteId: md5(Date.now().toString()),
                deviceId: device.id,
                valuation: device.valuation,
                valuationType: device.valuation > 0 ? "Gift Card" : null
            }
        });
    }
}

module.exports = StateController;