import { NgModule } from '@angular/core';
import { FEATURE_MODULES } from '@app/token';
import { Feature, FeatureModule } from '@app/type';
import { Language } from '@shared/module/poe/type';
import { ItemSearchIndexed } from '@shared/module/poe/type/search.type';
import { SharedModule } from '@shared/shared.module';
import { UserSettingsFeature } from 'src/app/layout/type';
import { EvaluateDialogComponent, EvaluateExchangeRateChartComponent, EvaluateExchangeRateComponent, EvaluateOptionsComponent, EvaluateResultView, EvaluateSearchChartComponent, EvaluateSearchComponent, EvaluateSearchTableComponent, EvaluateSettingsComponent, EvaluateUserSettings } from './component';
import { EvaluateService } from './service/evaluate.service';
import { EvaluateFrameComponent } from './page/evaluate-frame/evaluate-frame.component';

@NgModule({
    providers: [{ provide: FEATURE_MODULES, useClass: EvaluateModule, multi: true }],
    declarations: [
        EvaluateDialogComponent,
        EvaluateSettingsComponent,
        EvaluateSearchChartComponent,
        EvaluateExchangeRateChartComponent,
        EvaluateExchangeRateComponent,
        EvaluateSearchComponent,
        EvaluateSearchTableComponent,
        EvaluateOptionsComponent,
        EvaluateFrameComponent
    ],
    imports: [SharedModule]
})
export class EvaluateModule implements FeatureModule {

    constructor(private readonly evaluateService: EvaluateService) {
    }

    public getSettings(): UserSettingsFeature {
        const defaultSettings: EvaluateUserSettings = {
            evaluateCurrencyOriginal: true,
            evaluateCurrencyIds: ['chaos', 'exa'],
            evaluateResultView: EvaluateResultView.List,
            evaluateQueryDefaultItemLevel: true,
            evaluateQueryDefaultLinks: 5,
            evaluateQueryDefaultMiscs: true,
            evaluateQueryDefaultType: false,
            evaluateQueryDefaultStats: {
                'pseudo.pseudo_total_elemental_resistance': true,
                'pseudo.pseudo_total_resistance': true,
                'pseudo.pseudo_total_strength': true,
                'pseudo.pseudo_total_life': true,
                'pseudo.pseudo_total_energy_shield': true,
                'pseudo.pseudo_increased_energy_shield': true,
                'pseduo.pseudo_increased_movement_speed': true,
                'explicit.stat_1479533453': true,
                'enchant.stat_290368246': true,
                'implicit.stat_299373046': true,
            },
            evaluateQueryDefaultStatsUnique: true,
            evaluateQueryIndexedRange: ItemSearchIndexed.UpTo3DaysAgo,
            evaluateQueryOnline: true,
            evaluateQueryDebounceTime: 10,
            evaluateQueryFetchCount: 30,
            evaluateModifierMinRange: 10,
            evaluateModifierMaxRange: 50,
            evaluateKeybinding: 'Alt + D',
            evaluateTranslatedItemLanguage: Language.English,
            evaluateTranslatedKeybinding: 'Alt + T',
        };
        return {
            name: 'evaluate.name',
            component: EvaluateSettingsComponent,
            defaultSettings
        };
    }

    public getFeatures(settings: EvaluateUserSettings): Feature[] {
        return [
            {
                name: 'evaluate',
                accelerator: settings.evaluateKeybinding
            },
            {
                name: 'evaluate-translate',
                accelerator: settings.evaluateTranslatedKeybinding
            }
        ];
    }

    public run(feature: string, settings: EvaluateUserSettings): void {
        switch (feature) {
            case 'evaluate':
                this.evaluateService.evaluate(settings).subscribe();
                break;
            case 'evaluate-translate':
                this.evaluateService.evaluate(settings, settings.evaluateTranslatedItemLanguage).subscribe();
                break;
            default:
                break;
        }
    }
}
