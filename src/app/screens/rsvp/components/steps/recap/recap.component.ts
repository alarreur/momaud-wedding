// angular
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';

// rxjs
import { Subscription } from 'rxjs';

// primeng
import { ConfirmationService } from 'primeng/api';

// app
import { Guest, InviteStatus } from '@app/models';
import { StepService } from '@app/screens/rsvp/services';
import { Step } from '@app/screens/rsvp/models';

@Component({
  selector: 'momo-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss', '../step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecapComponent implements OnChanges, OnDestroy {
  @Input() public guest: Guest;
  @Input() public plusOne: Guest;
  @Input() public isCurrentStep: boolean;
  @Output() onPrevious = new EventEmitter<void>();
  @Output() onNext = new EventEmitter<void>();

  public isSaving: boolean = false;

  public cols: { header: string; field: string }[];

  public answers: {
    step: string;
    guest: boolean;
    plusOne?: boolean;
  }[];

  public get shouldDisplayHeader(): boolean {
    return !!this.guest && !!this.plusOne;
  }

  private _subscriptions: Subscription = new Subscription();

  constructor(private readonly _stepService: StepService, private _confirmationService: ConfirmationService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.guest || changes.plusOne) {
      this.cols = [
        {
          field: 'step',
          header: '',
        },
      ];

      let answers: {
        [Step.Ceremony]?: { guest: boolean; plusOne: boolean };
        [Step.Cocktail]?: { guest: boolean; plusOne: boolean };
        [Step.Diner]?: { guest: boolean; plusOne: boolean };
        [Step.Brunch]?: { guest: boolean; plusOne: boolean };
      } = {};

      if (this.guest) {
        this.cols.push({
          field: 'guest',
          header: this.guest.firstName,
        });

        if (this.guest.ceremonyStatus !== InviteStatus.NotInvited) {
          answers[Step.Ceremony] = { ...answers[Step.Ceremony], guest: this.guest.ceremonyStatus === InviteStatus.Attends };
        }

        if (this.guest.cocktailStatus !== InviteStatus.NotInvited) {
          answers[Step.Cocktail] = { ...answers[Step.Cocktail], guest: this.guest.cocktailStatus === InviteStatus.Attends };
        }

        if (this.guest.dinerStatus !== InviteStatus.NotInvited) {
          answers[Step.Diner] = { ...answers[Step.Diner], guest: this.guest.dinerStatus === InviteStatus.Attends };
        }

        if (this.guest.brunchStatus !== InviteStatus.NotInvited) {
          answers[Step.Brunch] = { ...answers[Step.Brunch], guest: this.guest.brunchStatus === InviteStatus.Attends };
        }
      }

      if (this.plusOne) {
        this.cols.push({
          field: 'plusOne',
          header: this.plusOne.firstName,
        });

        if (this.plusOne.ceremonyStatus !== InviteStatus.NotInvited) {
          answers[Step.Ceremony] = { ...answers[Step.Ceremony], plusOne: this.plusOne.ceremonyStatus === InviteStatus.Attends };
        }

        if (this.plusOne.cocktailStatus !== InviteStatus.NotInvited) {
          answers[Step.Cocktail] = { ...answers[Step.Cocktail], plusOne: this.plusOne.cocktailStatus === InviteStatus.Attends };
        }

        if (this.plusOne.dinerStatus !== InviteStatus.NotInvited) {
          answers[Step.Diner] = { ...answers[Step.Diner], plusOne: this.plusOne.dinerStatus === InviteStatus.Attends };
        }

        if (this.plusOne.brunchStatus !== InviteStatus.NotInvited) {
          answers[Step.Brunch] = { ...answers[Step.Brunch], plusOne: this.plusOne.brunchStatus === InviteStatus.Attends };
        }
      }

      this.answers = Object.keys(answers)
        .map((step) => parseInt(step))
        .map((step) => ({
          step: Step.translate(step),
          guest: answers[step].guest,
          plusOne: answers[step].plusOne,
        }));
    }
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public previous(): void {
    this.onPrevious.emit();
  }

  public save(): void {
    this.isSaving = true;
    this._subscriptions.add(
      this._stepService.save(this.guest, this.plusOne).subscribe(
        () => {
          this._confirmationService.confirm({
            header: 'Réponses sauvegardées !',
            icon: 'pi pi-check',
            message: 'Vos réponses ont été prises en compte. Vous allez être redirigé vers le programme.',
            acceptLabel: 'Ok',
            accept: () => {
              this.isSaving = false;
              this.onNext.emit();
            },
            rejectVisible: false,
          });
        },
        (error) => {
          console.log(error);
          this._confirmationService.confirm({
            header: 'Erreur !',
            icon: 'pi pi-exclamation-triangle',
            message: `Une erreur s'est produite lors de la sauvegarde de vos réponses. Veuillez réessayer. Si l'erreur se reproduit, veuillez nous contacter à: amaury.larreur@gmail.com`,
            acceptLabel: 'Fermer',
            accept: () => {
              this.isSaving = false;
            },
            rejectVisible: false,
          });
        }
      )
    );
  }
}
