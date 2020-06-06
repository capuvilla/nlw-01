import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;
        
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

            const porta = '3333';
            // Pegar IP
            var
                address: String // Local ip address that we're trying to calculate
                ,os = require('os') // Provides a few basic operating-system related utility functions (built-in)
                ,ifaces = os.networkInterfaces(); // Network interfaces

            // Iterate over interfaces ...
            // grava os dados em address
            for (var dev in ifaces) {
                // ... and find the one that matches the criteria
                var iface = ifaces[dev].filter(function(details) {
                    return details.family === 'IPv4' && details.internal === false;
                });
                if(iface.length > 0) address = iface[0].address;
            }

            const serializedPoints = points.map(point => {
                return {
                    ...point,
                    image_url: `http://${address}:${porta}/uploads/user/${point.image}`
                }
            });

        return response.json(serializedPoints);
    }

    // Serialização
    // API Transform

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'Point not found.' });
        }

        /**
         * SELECT * FROM
         *  JOIN point_items ON items.id = point_items.item_id
         *  WHERE point_items.point_id = { id }
         */

        const porta = '3333';
        // Pegar IP
        var
            address: String // Local ip address that we're trying to calculate
            ,os = require('os') // Provides a few basic operating-system related utility functions (built-in)
            ,ifaces = os.networkInterfaces(); // Network interfaces

        // Iterate over interfaces ...
        // grava os dados em address
        for (var dev in ifaces) {
            // ... and find the one that matches the criteria
            var iface = ifaces[dev].filter(function(details) {
                return details.family === 'IPv4' && details.internal === false;
            });
            if(iface.length > 0) address = iface[0].address;
        }

        const serializedPoint = {
            ...point,
            image_url: `http://${address}:${porta}/uploads/user/${point.image}`
        };

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json({ serializedPoint, items });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        const trx = await knex.transaction();

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
    
        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
            return {
                item_id,
                point_id
            }
        });
    
        await trx('point_items').insert(pointItems);

        await trx.commit();
    
        return response.json({ 
            id: point_id,
            ...point
        })
    }
}

export default PointsController;