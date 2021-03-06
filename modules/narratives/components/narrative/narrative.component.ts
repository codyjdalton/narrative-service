/**
 * narrative.component
 */
import { LitComponent } from '@litstack/core';
import { HttpResponse, HttpRequest } from '@litstack/core/dist/http';
import { PostMapping, PatchMapping } from '@litstack/core/dist/http/mappings';

import { NarrativeService } from '../../../common/services/narrative.service';
import { INarrative } from '../../../common/models/narrative.model';
import { ResourceComponent } from '../../../common/components/resource/resource.component.class';

@LitComponent()
export class NarrativeComponent extends ResourceComponent {

    constructor(protected mainService: NarrativeService) {
        super();
    }

    @PostMapping()
    public createOne(req: HttpRequest, res: HttpResponse): void {
        this.mainService.create(req.body.key, req.body.title)
            .subscribe(
                (narrative: INarrative) => res.success(narrative, 201),
                () => res.errored(400)
            );
    }

    @PatchMapping({
        path: ':id'
    })
    public update(req: HttpRequest, res: HttpResponse): void {

        const updateBody: object = {
            key: req.body.key || undefined,
            title: req.body.title || undefined
        };

        this.mainService.updateByIdObservable(req.params.id, updateBody)
            .subscribe(
                (narrative: INarrative) => res.success(narrative),
                (err) => res.errored(400, err)
            );
    }
}